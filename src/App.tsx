import { useState } from 'react'
import { Home } from './components/Home'
import { PraySession } from './components/PraySession'
import * as music from './lib/music'
import type { MysteryType } from './types'

type View = { name: 'home' } | { name: 'session'; mysteryType: MysteryType; selectedIndices: number[] }

export default function App() {
  const [view, setView] = useState<View>({ name: 'home' })
  const [musicEnabled, setMusicEnabled] = useState(() => music.loadMusicPref())

  function handleBegin(mysteryType: MysteryType, selectedIndices: number[]) {
    // Runs synchronously inside the Begin button's click handler so browsers
    // treat it as a user-gesture-triggered audio start, even if it starts muted.
    music.ensureStarted()
    music.setMuted(!musicEnabled)
    setView({ name: 'session', mysteryType, selectedIndices })
  }

  function handleLeaveSession() {
    music.dispose()
    setView({ name: 'home' })
  }

  function toggleMusic() {
    const next = !musicEnabled
    setMusicEnabled(next)
    music.saveMusicPref(next)
    // A click is itself a user gesture, so this can safely start playback too
    // if the visitor turns music on before ever pressing Begin.
    music.ensureStarted()
    music.setMuted(!next)
  }

  return (
    <>
      {view.name === 'session' ? (
        <PraySession mysteryType={view.mysteryType} selectedIndices={view.selectedIndices} onExit={handleLeaveSession} />
      ) : (
        <Home onBegin={handleBegin} />
      )}

      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={musicEnabled}
        aria-label={musicEnabled ? 'Turn background music off' : 'Turn background music on'}
        className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border text-lg shadow-lg backdrop-blur ${
          musicEnabled
            ? 'border-brand-500 bg-brand-600/90 text-white'
            : 'border-slate-700 bg-slate-900/90 text-slate-500'
        }`}
      >
        &#9834;
      </button>
    </>
  )
}
