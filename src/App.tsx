import { useState } from 'react'
import { Home } from './components/Home'
import { PraySession } from './components/PraySession'
import type { MysteryType } from './types'

type View =
  | { name: 'home' }
  | { name: 'session'; mysteryType: MysteryType; selectedIndices: number[]; musicEnabled: boolean }

export default function App() {
  const [view, setView] = useState<View>({ name: 'home' })

  if (view.name === 'session') {
    return (
      <PraySession
        mysteryType={view.mysteryType}
        selectedIndices={view.selectedIndices}
        initialMusicEnabled={view.musicEnabled}
        onExit={() => setView({ name: 'home' })}
      />
    )
  }

  return (
    <Home
      onBegin={(mysteryType, selectedIndices, musicEnabled) =>
        setView({ name: 'session', mysteryType, selectedIndices, musicEnabled })
      }
    />
  )
}
