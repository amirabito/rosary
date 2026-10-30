export type MysteryType = 'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous'

export type SymbolKey =
  | 'lily'
  | 'heart'
  | 'star'
  | 'candle'
  | 'scroll'
  | 'olive-branch'
  | 'pillar'
  | 'thorn-crown'
  | 'cross'
  | 'cross-tilted'
  | 'sunrise'
  | 'cloud'
  | 'dove'
  | 'moon-stars'
  | 'crown'
  | 'chalice'
  | 'mountain'
  | 'sunburst'

export interface Artwork {
  title: string
  artist: string
  year: string
}

export interface Scripture {
  verse: string
  reference: string
}

export interface Mystery {
  title: string
  fruit: string
  scripture: Scripture
  reflection: string
  artwork: Artwork
  /** Offline, hand-drawn fallback shown whenever the live artwork lookup fails or can't be verified. */
  symbol: SymbolKey
}

export type StepKind = 'opening' | 'announce' | 'prayer' | 'closing'

export interface RosaryStep {
  kind: StepKind
  title: string
  text: string
  reflection?: string
  fruit?: string
  scripture?: Scripture
  artwork?: Artwork
  symbol?: SymbolKey
  progress?: string
  /** 1-based position within the current bead group (e.g. 4th of 10 Hail Marys). */
  beadIndex?: number
  beadTotal?: number
}
