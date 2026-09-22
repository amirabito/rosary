export type MysteryType = 'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous'

export interface Artwork {
  title: string
  artist: string
  year: string
  /** Exact Wikimedia Commons file title (no "File:" prefix, no domain). */
  commonsFile: string
}

export interface Mystery {
  title: string
  fruit: string
  reflection: string
  artwork: Artwork
}

export type StepKind = 'opening' | 'announce' | 'prayer' | 'closing'

export interface RosaryStep {
  kind: StepKind
  title: string
  text: string
  reflection?: string
  fruit?: string
  artwork?: Artwork
  progress?: string
  /** 1-based position within the current bead group (e.g. 4th of 10 Hail Marys). */
  beadIndex?: number
  beadTotal?: number
}
