import { useState } from 'react'
import { DAY_NAMES, MYSTERIES, MYSTERY_TYPES, getMysteryForDay } from '../data/mysteries'
import { loadPrefs, savePrefs } from '../lib/storage'
import type { MysteryType } from '../types'

interface Props {
  onBegin: (mysteryType: MysteryType, selectedIndices: number[]) => void
}

export function Home({ onBegin }: Props) {
  const today = new Date()
  const todaysMystery = getMysteryForDay(today)
  const [mysteryType, setMysteryType] = useState<MysteryType>(todaysMystery)
  const [selected, setSelected] = useState<number[]>(() => loadPrefs().selectedIndices)

  const mysteries = MYSTERIES[mysteryType]
  const isToday = mysteryType === todaysMystery
  const isFull = selected.length === mysteries.length

  function toggle(i: number) {
    setSelected((prev) => {
      if (prev.includes(i)) {
        if (prev.length === 1) return prev // always keep at least one selected
        return prev.filter((x) => x !== i)
      }
      return [...prev, i].sort((a, b) => a - b)
    })
  }

  function selectFullRosary() {
    setSelected(mysteries.map((_, i) => i))
  }

  function handleBegin() {
    savePrefs({ selectedIndices: selected })
    onBegin(mysteryType, selected)
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
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Which mysteries?</h2>
          {!isFull && (
            <button type="button" onClick={selectFullRosary} className="text-xs text-brand-400">
              Select full Rosary
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {isFull
            ? 'Praying all 5 decades, with the full opening prayers.'
            : `Praying ${selected.length} decade${selected.length === 1 ? '' : 's'} — straight into the meditation, no opening prayers.`}
        </p>

        <div className="mt-3 space-y-2">
          {mysteries.map((m, i) => {
            const checked = selected.includes(i)
            return (
              <button
                key={m.title}
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={checked}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                  checked
                    ? 'border-brand-600 bg-brand-950/40 text-white'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 active:bg-slate-800'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                    checked ? 'border-brand-500 bg-brand-600 text-white' : 'border-slate-700 text-transparent'
                  }`}
                >
                  &#10003;
                </span>
                <span>
                  {i + 1}. {m.title}
                </span>
              </button>
            )
          })}
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
