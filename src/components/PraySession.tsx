import { useMemo, useState } from 'react'
import { buildRosarySteps } from '../lib/flow'
import type { Artwork, MysteryType } from '../types'

interface Props {
  mysteryType: MysteryType
  selectedIndices: number[]
  onExit: () => void
}

function BeadRow({ current, total }: { current: number; total: number }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-1.5" aria-label={`Hail Mary ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1
        if (n === current) {
          return (
            <span
              key={n}
              className="h-3.5 w-3.5 rounded-full bg-brand-400 ring-2 ring-brand-300/50 ring-offset-2 ring-offset-slate-950"
            />
          )
        }
        return (
          <span key={n} className={`h-2.5 w-2.5 rounded-full ${n < current ? 'bg-brand-700' : 'bg-slate-700'}`} />
        )
      })}
    </div>
  )
}

function MysteryArt({ artwork }: { artwork: Artwork }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  const src = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(artwork.commonsFile)}?width=900`

  return (
    <figure className="-mx-5 -mt-5 mb-1 overflow-hidden rounded-t-xl">
      <img
        src={src}
        alt={`${artwork.title} by ${artwork.artist}`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="max-h-64 w-full object-cover"
      />
      <figcaption className="bg-slate-950/60 px-3 py-1.5 text-center text-[11px] italic text-slate-500">
        {artwork.artist}, <span className="not-italic">{artwork.title}</span>, {artwork.year}
      </figcaption>
    </figure>
  )
}

export function PraySession({ mysteryType, selectedIndices, onExit }: Props) {
  const steps = useMemo(() => buildRosarySteps(mysteryType, selectedIndices), [mysteryType, selectedIndices])
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
          You prayed the {mysteryType} Mysteries &mdash; {selectedIndices.length} decade
          {selectedIndices.length === 1 ? '' : 's'}.
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

      {step.beadTotal && step.beadIndex && <BeadRow current={step.beadIndex} total={step.beadTotal} />}

      <div className="mt-3 flex flex-1 flex-col justify-center overflow-y-auto py-2">
        <h1 className="text-center text-2xl font-bold text-white">{step.title}</h1>

        {step.kind === 'announce' ? (
          <div className="mt-4 space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
            {step.artwork && <MysteryArt key={step.text} artwork={step.artwork} />}
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
