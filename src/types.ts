export type MysteryType = 'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous'

export interface Mystery {
  title: string
  fruit: string
  reflection: string
}

export type StepKind = 'opening' | 'announce' | 'prayer' | 'closing'

export interface RosaryStep {
  kind: StepKind
  title: string
  text: string
  reflection?: string
  fruit?: string
  progress?: string
}
