// A soft, fully synthesized ambient piece (no audio file, no network, no
// licensing concerns) meant to evoke a quiet church atmosphere while praying.
// It's an original, freely-composed melodic phrase — a slow, stepwise line in
// D Dorian (the mode much sacred/chant music uses) that glides between notes
// over a soft sustained pad, rather than a static drone, so it reads as a
// gentle "song" instead of background noise.

const PREF_KEY = 'rosary:music-enabled'
const VOLUME = 0.13
const FADE_SECONDS = 2.2

interface Note {
  freq: number
  dur: number
}

// Original composition — not a transcription of any existing hymn or chant.
// D Dorian, arch-shaped phrase (rises to a peak, settles back to the tonic).
const MELODY: Note[] = [
  { freq: 293.66, dur: 3.0 }, // D4
  { freq: 349.23, dur: 2.0 }, // F4
  { freq: 392.0, dur: 2.0 }, // G4
  { freq: 440.0, dur: 3.5 }, // A4 — peak
  { freq: 392.0, dur: 2.0 }, // G4
  { freq: 349.23, dur: 2.0 }, // F4
  { freq: 329.63, dur: 2.0 }, // E4
  { freq: 293.66, dur: 3.0 }, // D4
  { freq: 261.63, dur: 2.0 }, // C4
  { freq: 293.66, dur: 2.0 }, // D4
  { freq: 329.63, dur: 2.0 }, // E4
  { freq: 293.66, dur: 4.0 }, // D4 — resolves
]
const MELODY_GLIDE = 0.4 // seconds of portamento between held notes
const PHRASE_SECONDS = MELODY.reduce((sum, note) => sum + note.dur, 0)

const PAD_HZ = [146.83, 220.0] // D3 + A3 — a quiet open-fifth pedal under the melody

let ctx: AudioContext | null = null
let masterGain: GainNode | null = null
let oscillators: OscillatorNode[] = []
let melodyVoices: OscillatorNode[] = []
let loopActive = false
let loopTimer: ReturnType<typeof setTimeout> | null = null

function getAudioContextCtor(): typeof AudioContext | undefined {
  if (typeof window === 'undefined') return undefined
  return window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
}

function scheduleMelody(startAt: number) {
  if (melodyVoices.length === 0) return
  let noteStart = startAt
  melodyVoices.forEach((osc) => {
    osc.frequency.cancelScheduledValues(startAt)
    osc.frequency.setValueAtTime(MELODY[0].freq, startAt)
  })
  for (let i = 1; i < MELODY.length; i++) {
    noteStart += MELODY[i - 1].dur
    melodyVoices.forEach((osc) => {
      osc.frequency.linearRampToValueAtTime(MELODY[i].freq, noteStart + MELODY_GLIDE)
    })
  }
}

function loopScheduler(context: AudioContext) {
  if (!loopActive) return
  scheduleMelody(context.currentTime + 0.05)
  loopTimer = setTimeout(() => loopScheduler(context), PHRASE_SECONDS * 1000)
}

function buildGraph(context: AudioContext, out: GainNode) {
  const filter = context.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1800

  const swell = context.createGain()
  swell.gain.value = 1
  filter.connect(swell)
  swell.connect(out)

  const padGain = context.createGain()
  padGain.gain.value = 0.35
  padGain.connect(filter)
  const padOscs = PAD_HZ.map((freq, i) => {
    const osc = context.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    osc.detune.value = (i - PAD_HZ.length / 2) * 3
    const voiceGain = context.createGain()
    voiceGain.gain.value = 1 / PAD_HZ.length
    osc.connect(voiceGain)
    voiceGain.connect(padGain)
    osc.start()
    return osc
  })

  // Two gently detuned voices in unison give the melody a soft, choir-like
  // shimmer rather than a single thin tone.
  const melodyGain = context.createGain()
  melodyGain.gain.value = 0.8
  melodyGain.connect(filter)
  melodyVoices = [
    { type: 'triangle' as OscillatorType, detune: -5 },
    { type: 'sine' as OscillatorType, detune: 5 },
  ].map(({ type, detune }) => {
    const osc = context.createOscillator()
    osc.type = type
    osc.detune.value = detune
    osc.frequency.value = MELODY[0].freq
    osc.connect(melodyGain)
    osc.start()
    return osc
  })

  // Slow gain swell so the whole piece breathes instead of sitting static.
  const lfo = context.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.value = 0.045
  const lfoGain = context.createGain()
  lfoGain.gain.value = 0.12
  lfo.connect(lfoGain)
  lfoGain.connect(swell.gain)
  lfo.start()

  oscillators = [...padOscs, ...melodyVoices, lfo]

  loopActive = true
  loopScheduler(context)
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

/** Fades out, stops the oscillators, and closes the context — call when leaving the prayer flow entirely. */
export function dispose() {
  if (!ctx || !masterGain) return
  loopActive = false
  if (loopTimer !== null) {
    clearTimeout(loopTimer)
    loopTimer = null
  }

  const context = ctx
  const gain = masterGain
  const oscs = oscillators
  const now = context.currentTime
  gain.gain.cancelScheduledValues(now)
  gain.gain.setValueAtTime(gain.gain.value, now)
  gain.gain.linearRampToValueAtTime(0, now + 0.6)

  setTimeout(() => {
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
  melodyVoices = []
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
