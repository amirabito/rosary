import { useState } from 'react'
import { Home } from './components/Home'
import { PraySession } from './components/PraySession'
import type { MysteryType } from './types'

type View = { name: 'home' } | { name: 'session'; mysteryType: MysteryType; decadeCount: number }

export default function App() {
  const [view, setView] = useState<View>({ name: 'home' })

  if (view.name === 'session') {
    return (
      <PraySession
        mysteryType={view.mysteryType}
        decadeCount={view.decadeCount}
        onExit={() => setView({ name: 'home' })}
      />
    )
  }

  return (
    <Home onBegin={(mysteryType, decadeCount) => setView({ name: 'session', mysteryType, decadeCount })} />
  )
}
