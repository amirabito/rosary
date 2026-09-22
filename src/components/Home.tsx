import { useState } from 'react'
import { DAY_NAMES, MYSTERIES, MYSTERY_TYPES, getMysteryForDay } from '../data/mysteries'
import { loadPrefs, savePrefs } from '../lib/storage'
import type { MysteryType } from '../types'

interface Props {
  onBegin: (mysteryType: MysteryType, decadeCount: number) => void
}

export function Home({ onBegin }: Props) {
  const today = new Date()
  const todaysMystery = getMysteryForDay(today)
  const [mysteryType, setMysteryType] = useState<MysteryType>(todaysMystery)
  const [decadeCount, setDecadeCount] = useState(() => loadPrefs().decadeCount)

  const mysteries = MYSTERIES[mysteryType]
  const isToday = mysteryType === todaysMystery

  function handleBegin() {
    savePrefs({ decadeCount })
    onBegin(mysteryType, decadeCount)
  }

  return (
    <div className="mx-auto max-w-lg px-4 pb-16 pt-8">
      <h1 className="text-2xl font-bold text-white">Rosary</h1>
      <p className="text-sm text-slate-400">
        {DAY_NAMES[today.getDay()]}, {today.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
      </p>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">{isToday ? "Today's Mysteries" : 'Praying'}</h2>
          {!isToday && (
            <button type="button" onClick={() => setMysteryType(todaysMystery)} className="text-xs text-brand-400">
              Use today's
            </button>
          )}
        </div>
        <p className="mt-1 text-lg font-bold text-brand-400">{mysteryType} Mysteries</p>

        <ol className="mt-3 space-y-1.5 text-sm text-slate-300">
          {mysteries.map((m, i) => (
            <li key={m.title} className="flex gap-2">
              <span className="text-slate-500">{i + 1}.</span>
              <span>{m.title}</span>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-wrap gap-2">
          {MYSTERY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMysteryType(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                type === mysteryType ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-300 active:bg-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="text-sm font-semibold text-white">Decades to pray</h2>
        <p className="mt-1 text-xs text-slate-500">A full Rosary is 5 decades. Pray fewer if you're short on time.</p>
        <div className="mt-3 flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setDecadeCount(n)}
              className={`h-11 w-11 rounded-full text-sm font-semibold ${
                n === decadeCount ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-300 active:bg-slate-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleBegin}
        className="mt-6 w-full rounded-xl bg-brand-600 py-3.5 text-base font-semibold text-white active:bg-brand-700"
      >
        Begin the Rosary &rarr;
      </button>
    </div>
  )
}
