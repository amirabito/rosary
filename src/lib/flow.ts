import { MYSTERIES } from '../data/mysteries'
import { PRAYERS } from '../data/prayers'
import type { MysteryType, RosaryStep } from '../types'

const ORDINALS = ['First', 'Second', 'Third', 'Fourth', 'Fifth']
const OPENING_INTENTIONS = ['for an increase in Faith', 'for an increase in Hope', 'for an increase in Charity']

export function buildRosarySteps(mysteryType: MysteryType, decadeCount: number): RosaryStep[] {
  const decades = MYSTERIES[mysteryType].slice(0, Math.max(1, Math.min(5, decadeCount)))
  const steps: RosaryStep[] = []

  steps.push({ kind: 'opening', title: 'Sign of the Cross', text: PRAYERS.signOfTheCross })
  steps.push({ kind: 'opening', title: "Apostles' Creed", text: PRAYERS.apostlesCreed })
  steps.push({ kind: 'opening', title: 'Our Father', text: PRAYERS.ourFather })

  OPENING_INTENTIONS.forEach((intent, i) => {
    steps.push({
      kind: 'opening',
      title: 'Hail Mary',
      text: PRAYERS.hailMary,
      progress: `Hail Mary ${i + 1} of 3 — ${intent}`,
    })
  })

  steps.push({ kind: 'opening', title: 'Glory Be', text: PRAYERS.gloryBe })

  decades.forEach((mystery, di) => {
    const label = `Decade ${di + 1} of ${decades.length}`

    steps.push({
      kind: 'announce',
      title: `${ORDINALS[di]} ${mysteryType} Mystery`,
      text: mystery.title,
      fruit: mystery.fruit,
      reflection: mystery.reflection,
      progress: label,
    })

    steps.push({ kind: 'prayer', title: 'Our Father', text: PRAYERS.ourFather, progress: label })

    for (let hm = 1; hm <= 10; hm++) {
      steps.push({
        kind: 'prayer',
        title: 'Hail Mary',
        text: PRAYERS.hailMary,
        progress: `${label} — Hail Mary ${hm} of 10`,
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
