import { MYSTERIES } from '../data/mysteries'
import { PRAYERS } from '../data/prayers'
import type { MysteryType, RosaryStep } from '../types'

const ORDINALS = ['First', 'Second', 'Third', 'Fourth', 'Fifth']
const OPENING_INTENTIONS = ['for an increase in Faith', 'for an increase in Hope', 'for an increase in Charity']

/**
 * `selectedIndices` are 0-based positions into MYSTERIES[mysteryType]. When all
 * 5 are selected this is a full, traditional Rosary and opens with the Creed
 * and opening prayers. Any smaller selection is a focused prayer on just
 * those mysteries, so it skips straight to the first mystery's meditation.
 */
export function buildRosarySteps(mysteryType: MysteryType, selectedIndices: number[]): RosaryStep[] {
  const allMysteries = MYSTERIES[mysteryType]
  const uniqueSorted = [...new Set(selectedIndices)]
    .filter((i) => i >= 0 && i < allMysteries.length)
    .sort((a, b) => a - b)
  const decades = uniqueSorted.length > 0 ? uniqueSorted : allMysteries.map((_, i) => i)
  const isFullRosary = decades.length === allMysteries.length

  const steps: RosaryStep[] = []

  if (isFullRosary) {
    steps.push({ kind: 'opening', title: 'Sign of the Cross', text: PRAYERS.signOfTheCross })
    steps.push({ kind: 'opening', title: "Apostles' Creed", text: PRAYERS.apostlesCreed })
    steps.push({ kind: 'opening', title: 'Our Father', text: PRAYERS.ourFather })

    OPENING_INTENTIONS.forEach((intent, i) => {
      steps.push({
        kind: 'opening',
        title: 'Hail Mary',
        text: PRAYERS.hailMary,
        progress: `Hail Mary ${i + 1} of 3 — ${intent}`,
        beadIndex: i + 1,
        beadTotal: 3,
      })
    })

    steps.push({ kind: 'opening', title: 'Glory Be', text: PRAYERS.gloryBe })
  }

  decades.forEach((mysteryIndex, di) => {
    const mystery = allMysteries[mysteryIndex]
    const label = `Decade ${di + 1} of ${decades.length}`

    steps.push({
      kind: 'announce',
      title: `${ORDINALS[mysteryIndex]} ${mysteryType} Mystery`,
      text: mystery.title,
      fruit: mystery.fruit,
      scripture: mystery.scripture,
      reflection: mystery.reflection,
      artwork: mystery.artwork,
      progress: label,
    })

    steps.push({ kind: 'prayer', title: 'Our Father', text: PRAYERS.ourFather, progress: label })

    for (let hm = 1; hm <= 10; hm++) {
      steps.push({
        kind: 'prayer',
        title: 'Hail Mary',
        text: PRAYERS.hailMary,
        progress: `${label} — Hail Mary ${hm} of 10`,
        beadIndex: hm,
        beadTotal: 10,
      })
    }

    steps.push({ kind: 'prayer', title: 'Glory Be', text: PRAYERS.gloryBe, progress: label })
    steps.push({ kind: 'prayer', title: 'O My Jesus', text: PRAYERS.fatima, progress: label })
  })

  steps.push({ kind: 'closing', title: 'Hail, Holy Queen', text: PRAYERS.hailHolyQueen })
  steps.push({ kind: 'closing', title: 'Closing Prayer', text: PRAYERS.closing })
  steps.push({ kind: 'closing', title: 'Sign of the Cross', text: PRAYERS.signOfTheCross })

  return steps
}
