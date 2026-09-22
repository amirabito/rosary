import { useMemo, useState } from 'react'
import { buildRosarySteps } from '../lib/flow'
import type { MysteryType } from '../types'

interface Props {
  mysteryType: MysteryType
  decadeCount: number
  onExit: () => void
}

export function PraySession({ mysteryType, decadeCount, onExit }: Props) {
  const steps = useMemo(() => buildRosarySteps(mysteryType, decadeCount), [mysteryType, decadeCount])
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  const step = steps[index]
  const isFirst = index === 0
  const isLast = index === steps.length - 1

  function handleNext() {
    if (isLast) {
      setDone(true)
      return
    }
    setIndex((i) => Math.min(i + 1, steps.length - 1))
  }

  function handleBack() {
    setIndex((i) => Math.max(i - 1, 0))
  }

  if (done) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 text-center">
        <p className="text-4xl">&#10013;</p>
        <h1 className="mt-4 text-xl font-bold text-white">Rosary Complete</h1>
        <p className="mt-2 text-sm text-slate-400">
          You prayed the {mysteryType} Mysteries &mdash; {decadeCount} decade{decadeCount === 1 ? '' : 's'}.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="mt-8 w-full max-w-xs rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white active:bg-brand-700"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col px-4 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-slate-500 active:text-slate-300">
          &times; Exit
        </button>
        <span className="text-xs text-slate-500">
          {index + 1} / {steps.length}
        </span>
      </div>

      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-brand-500 transition-all"
          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
        />
      </div>

      {step.progress && (
        <p className="mt-4 text-center text-xs font-medium uppercase tracking-wide text-brand-400">
          {step.progress}
        </p>
      )}

      <div className="mt-3 flex flex-1 flex-col justify-center">
        <h1 className="text-center text-2xl font-bold text-white">{step.title}</h1>

        {step.kind === 'announce' ? (
          <div className="mt-4 space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-center text-lg font-semibold text-brand-300">{step.text}</p>
            {step.fruit && (
              <p className="text-center text-xs uppercase tracking-wide text-slate-500">
                Fruit of the Mystery: <span className="text-slate-300">{step.fruit}</span>
              </p>
            )}
            {step.reflection && (
              <p className="text-center text-sm leading-relaxed text-slate-300">{step.reflection}</p>
            )}
          </div>
        ) : (
          <p className="mt-4 whitespace-pre-line text-center text-lg leading-relaxed text-slate-200">{step.text}</p>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className="flex-1 rounded-xl border border-slate-800 py-3.5 text-sm font-medium text-slate-300 disabled:opacity-30 active:bg-slate-800"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-[2] rounded-xl bg-brand-600 py-3.5 text-base font-semibold text-white active:bg-brand-700"
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}
