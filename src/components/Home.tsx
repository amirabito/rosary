import { useState } from 'react'
import { DAY_NAMES, MYSTERIES, MYSTERY_TYPES, getMysteryForDay } from '../data/mysteries'
import * as music from '../lib/music'
import type { MysteryType } from '../types'

interface Props {
  onBegin: (mysteryType: MysteryType, selectedIndices: number[], musicEnabled: boolean) => void
}

export function Home({ onBegin }: Props) {
  const today = new Date()
  const todaysMystery = getMysteryForDay(today)
  const [mysteryType, setMysteryType] = useState<MysteryType>(todaysMystery)
  const [selected, setSelected] = useState<number[]>([])
  const [musicEnabled, setMusicEnabled] = useState(() => music.loadMusicPref())

  const mysteries = MYSTERIES[mysteryType]
  const isToday = mysteryType === todaysMystery
  const isFull = selected.length === mysteries.length
  const canBegin = selected.length > 0

  function toggle(i: number) {
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].sort((a, b) => a - b)))
  }

  function selectFullRosary() {
    setSelected(mysteries.map((_, i) => i))
  }

  function handleBegin() {
    if (!canBegin) return
    // Must run synchronously inside this click handler so browsers treat it as
    // a user-gesture-triggered audio start, even if music begins muted.
    music.ensureStarted()
    music.setMuted(!musicEnabled)
    music.saveMusicPref(musicEnabled)
    onBegin(mysteryType, selected, musicEnabled)
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
          {selected.length === 0
            ? 'Tap the mysteries you want to pray.'
            : isFull
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
        onClick={() => setMusicEnabled((v) => !v)}
        aria-pressed={musicEnabled}
        className="mt-6 flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm"
      >
        <span className="text-slate-300">Background music while praying</span>
        <span className={musicEnabled ? 'font-medium text-brand-400' : 'text-slate-600'}>
          {musicEnabled ? 'On' : 'Off'}
        </span>
      </button>

      <button
        type="button"
        onClick={handleBegin}
        disabled={!canBegin}
        className="mt-3 w-full rounded-xl bg-brand-600 py-3.5 text-base font-semibold text-white active:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
      >
        {canBegin ? 'Begin the Rosary →' : 'Choose at least one mystery'}
      </button>
    </div>
  )
}
