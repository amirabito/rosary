// A soft, fully synthesized ambient drone (no audio file, no network) meant to
// evoke a quiet church atmosphere while praying. Uses an open fifth + octave
// voicing, which reads as a sacred/organ-like drone rather than a pop pad.

const PREF_KEY = 'rosary:music-enabled'
const VOLUME = 0.11
const FADE_SECONDS = 2.2
const CHORD_HZ = [146.83, 220.0, 293.66, 440.0] // D3, A3 (5th), D4 (octave), A4 (soft shimmer)

let ctx: AudioContext | null = null
let masterGain: GainNode | null = null
let oscillators: OscillatorNode[] = []

function getAudioContextCtor(): typeof AudioContext | undefined {
  if (typeof window === 'undefined') return undefined
  return window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
}

function buildGraph(context: AudioContext, out: GainNode) {
  const filter = context.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1400

  const swell = context.createGain()
  swell.gain.value = 1
  filter.connect(swell)
  swell.connect(out)

  oscillators = CHORD_HZ.map((freq, i) => {
    const osc = context.createOscillator()
    osc.type = i % 2 === 0 ? 'sine' : 'triangle'
    osc.frequency.value = freq
    osc.detune.value = (i - CHORD_HZ.length / 2) * 3
    const voiceGain = context.createGain()
    voiceGain.gain.value = 1 / CHORD_HZ.length
    osc.connect(voiceGain)
    voiceGain.connect(filter)
    osc.start()
    return osc
  })

  // Slow gain swell so the drone breathes instead of sitting static.
  const lfo = context.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.value = 0.045
  const lfoGain = context.createGain()
  lfoGain.gain.value = 0.15
  lfo.connect(lfoGain)
  lfoGain.connect(swell.gain)
  lfo.start()
  oscillators.push(lfo)
}

/** Creates (if needed) and resumes the audio graph. Call synchronously from a user gesture. */
export function ensureStarted() {
  const Ctor = getAudioContextCtor()
  if (!Ctor) return

  if (!ctx) {
    ctx = new Ctor()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(ctx.destination)
    buildGraph(ctx, masterGain)
  }
  if (ctx.state === 'suspended') void ctx.resume()
}

export function setMuted(muted: boolean) {
  if (!ctx || !masterGain) return
  const now = ctx.currentTime
  masterGain.gain.cancelScheduledValues(now)
  masterGain.gain.setValueAtTime(masterGain.gain.value, now)
  masterGain.gain.linearRampToValueAtTime(muted ? 0 : VOLUME, now + FADE_SECONDS)
}

/** Fades out, stops the oscillators, and closes the context — call when leaving the prayer screen. */
export function dispose() {
  if (!ctx || !masterGain) return
  const context = ctx
  const gain = masterGain
  const oscs = oscillators
  const now = context.currentTime
  gain.gain.cancelScheduledValues(now)
  gain.gain.setValueAtTime(gain.gain.value, now)
  gain.gain.linearRampToValueAtTime(0, now + 0.6)

  window.setTimeout(() => {
    oscs.forEach((osc) => {
      try {
        osc.stop()
      } catch {
        // already stopped
      }
    })
    void context.close()
  }, 700)

  ctx = null
  masterGain = null
  oscillators = []
}

export function loadMusicPref(): boolean {
  try {
    const raw = localStorage.getItem(PREF_KEY)
    return raw === null ? true : raw === '1'
  } catch {
    return true
  }
}

export function saveMusicPref(enabled: boolean) {
  try {
    localStorage.setItem(PREF_KEY, enabled ? '1' : '0')
  } catch {
    // localStorage unavailable (e.g. private browsing) — preference just won't persist
  }
}
