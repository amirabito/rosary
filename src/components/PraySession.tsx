import { useEffect, useMemo, useState } from 'react'
import { buildRosarySteps } from '../lib/flow'
import { MysterySymbol } from './MysterySymbol'
import type { Artwork, MysteryType, SymbolKey } from '../types'

interface Props {
  mysteryType: MysteryType
  selectedIndices: number[]
  onExit: () => void
}

interface WikiImageSearchResponse {
  query?: {
    pages?: Record<string, { title?: string; index?: number; original?: { source?: string } }>
  }
}

const TITLE_STOPWORDS = new Set([
  'the',
  'of',
  'in',
  'at',
  'with',
  'and',
  'a',
  'an',
  'to',
  'on',
  'painting',
])

const NAME_CONNECTORS = new Set(['da', 'di', 'de', 'del', 'della', 'van', 'von', 'the'])

function stripAccents(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function significantWords(text: string): string[] {
  return stripAccents(text)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !TITLE_STOPWORDS.has(w))
}

/** First/last names etc. a candidate page might plausibly use to refer to this artist — some
 * artists (Leonardo, Michelangelo, Raphael, Titian) are conventionally disambiguated on
 * Wikipedia by first name alone, so requiring the surname specifically would wrongly reject
 * the correct page for them. */
function artistNameTokens(artist: string): string[] {
  return stripAccents(artist)
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !NAME_CONNECTORS.has(w))
}

/**
 * A loose text search always returns *some* top hit, even when it's the
 * wrong painting (a different artist's version, a disambiguation page, an
 * unrelated work). Only accept a candidate whose own page title contains at
 * least one of the artist's name tokens — reject everything else rather than
 * show a mismatch. Among those, prefer ones that also share words with the
 * painting's title.
 */
function pickBestMatch(
  pages: Record<string, { title?: string; original?: { source?: string } }>,
  artwork: Artwork,
): string | null {
  const nameTokens = artistNameTokens(artwork.artist)
  const titleWords = significantWords(artwork.title)

  let best: { score: number; src: string } | null = null
  for (const page of Object.values(pages)) {
    const pageTitle = stripAccents(page.title?.toLowerCase() ?? '')
    const src = page.original?.source
    if (!src || !pageTitle || nameTokens.length === 0) continue
    if (!nameTokens.some((t) => pageTitle.includes(t))) continue

    const score = titleWords.reduce((sum, w) => sum + (pageTitle.includes(w) ? 1 : 0), 0)
    if (!best || score > best.score) best = { score, src }
  }
  return best?.src ?? null
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

/**
 * Always shows something for the mystery: a hand-drawn, fully offline symbol
 * by default (guaranteed — no network dependency, so it can never be missing
 * or mismatched), upgraded to the real painting only once a live Wikipedia
 * lookup both resolves and passes the artist/title match check.
 */
function MysteryArt({ artwork, symbol }: { artwork: Artwork; symbol: SymbolKey }) {
  const [src, setSrc] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    setSrc(null)
    setFailed(false)

    const url =
      'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=8&prop=pageimages&piprop=original&format=json&origin=*&gsrsearch=' +
      encodeURIComponent(artwork.wikiQuery)

    fetch(url)
      .then((res) => res.json() as Promise<WikiImageSearchResponse>)
      .then((data) => {
        if (cancelled) return
        const pages = data.query?.pages
        const imageUrl = pages ? pickBestMatch(pages, artwork) : null
        if (imageUrl) setSrc(imageUrl)
        else setFailed(true)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [artwork.wikiQuery])

  if (src && !failed) {
    return (
      <figure className="-mx-5 -mt-5 mb-1 overflow-hidden rounded-t-xl bg-slate-950">
        <img
          src={src}
          alt={`${artwork.title} by ${artwork.artist}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-[50vh] w-full object-contain"
        />
        <figcaption className="bg-slate-950/60 px-3 py-1.5 text-center text-[11px] italic text-slate-500">
          {artwork.artist}, <span className="not-italic">{artwork.title}</span>, {artwork.year}
        </figcaption>
      </figure>
    )
  }

  return (
    <div className="-mx-5 -mt-5 mb-1 flex flex-col items-center gap-2 rounded-t-xl bg-slate-950 py-6">
      <MysterySymbol symbol={symbol} className="h-16 w-16 text-brand-400" />
    </div>
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

      <button
        type="button"
        onClick={handleNext}
        className="mt-3 flex flex-1 flex-col justify-center overflow-y-auto rounded-xl py-2 text-left active:bg-slate-900/40"
      >
        <h1 className="text-center text-2xl font-bold text-white">{step.title}</h1>

        {step.kind === 'announce' ? (
          <div className="mt-4 space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
            {step.artwork && step.symbol && (
              <MysteryArt key={step.text} artwork={step.artwork} symbol={step.symbol} />
            )}
            <p className="text-center text-lg font-semibold text-brand-300">{step.text}</p>
            {step.scripture && (
              <p className="text-center text-sm italic leading-relaxed text-slate-400">
                &ldquo;{step.scripture.verse}&rdquo;{' '}
                <span className="not-italic text-slate-500">&mdash; {step.scripture.reference}</span>
              </p>
            )}
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
      </button>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className="rounded-lg px-3 py-2 text-sm text-slate-400 disabled:opacity-20 active:text-slate-200"
        >
          &lsaquo; Back
        </button>
        <p className="text-xs text-slate-600">{isLast ? 'Tap to finish' : 'Tap anywhere to continue'}</p>
      </div>
    </div>
  )
}
