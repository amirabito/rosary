import type { Mystery, MysteryType } from '../types'

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const MYSTERY_TYPES: MysteryType[] = ['Joyful', 'Sorrowful', 'Glorious', 'Luminous']

// Traditional day assignment: Joyful (Mon, Sat) · Sorrowful (Tue, Fri) ·
// Glorious (Wed, Sun) · Luminous (Thu).
export const DAY_MYSTERY: Record<number, MysteryType> = {
  0: 'Glorious',
  1: 'Joyful',
  2: 'Sorrowful',
  3: 'Glorious',
  4: 'Luminous',
  5: 'Sorrowful',
  6: 'Joyful',
}

export function getMysteryForDay(date: Date = new Date()): MysteryType {
  return DAY_MYSTERY[date.getDay()]
}

export const MYSTERIES: Record<MysteryType, Mystery[]> = {
  Joyful: [
    {
      title: 'The Annunciation',
      fruit: 'Humility',
      reflection:
        "The angel Gabriel greets Mary and invites her to become the Mother of God. Reflect on Mary's humble ‘yes’ — her total trust in God's plan even without understanding it fully. Ask for the grace to say yes to God's will in your own life today.",
    },
    {
      title: 'The Visitation',
      fruit: 'Love of Neighbor',
      reflection:
        "Mary hurries to help her cousin Elizabeth, carrying Christ within her. Consider how Mary's charity moved her to serve others right away, without hesitation. Ask for a heart that brings Christ to everyone you meet.",
    },
    {
      title: 'The Nativity',
      fruit: 'Poverty of Spirit',
      reflection:
        'Jesus is born in a stable, poor and humble, yet He is the King of Kings. Reflect on the simplicity that surrounded His birth. Ask for the grace of detachment from worldly comfort and possessions.',
    },
    {
      title: 'The Presentation',
      fruit: 'Obedience',
      reflection:
        "Mary and Joseph present the infant Jesus in the Temple, fulfilling the Law, and Simeon prophesies the sword that will pierce Mary's heart. Reflect on their obedience even amid the sorrow to come. Ask for the grace to remain obedient to God even when the path ahead is unclear.",
    },
    {
      title: 'The Finding in the Temple',
      fruit: 'Joy in Finding Jesus',
      reflection:
        'After three anxious days, Mary and Joseph find the boy Jesus teaching in the Temple. Reflect on the joy and relief of finding Christ after a time of searching. Ask for the grace to seek Jesus earnestly whenever He seems distant.',
    },
  ],
  Sorrowful: [
    {
      title: 'The Agony in the Garden',
      fruit: "Conformity to God's Will",
      reflection:
        "Jesus sweats blood in Gethsemane, accepting the Father's will though His human nature recoils from the suffering ahead. Reflect on Christ's total surrender: ‘not as I will, but as you will.’ Ask for the grace to accept God's will even in your own trials.",
    },
    {
      title: 'The Scourging at the Pillar',
      fruit: 'Purity',
      reflection:
        'Jesus is bound and brutally scourged for our sins. Reflect on the physical suffering He endured out of love for you. Ask for the grace of purity and the strength to master your own desires.',
    },
    {
      title: 'The Crowning with Thorns',
      fruit: 'Moral Courage',
      reflection:
        'Soldiers mock Jesus as king, pressing a crown of thorns into His head. Reflect on the humiliation Christ accepted willingly to atone for our pride. Ask for the courage to endure ridicule and stand firm in your faith.',
    },
    {
      title: 'The Carrying of the Cross',
      fruit: 'Patience',
      reflection:
        'Jesus carries the heavy cross toward Calvary, falling beneath its weight yet pressing on. Reflect on His patient endurance and the help of Simon of Cyrene. Ask for the grace to carry your own daily crosses with patience.',
    },
    {
      title: 'The Crucifixion',
      fruit: 'Self-Denial',
      reflection:
        'Jesus dies on the cross, offering His life completely for the salvation of the world. Reflect on the depth of love shown in this final sacrifice. Ask for the grace to die to self and live for God and others.',
    },
  ],
  Glorious: [
    {
      title: 'The Resurrection',
      fruit: 'Faith',
      reflection:
        'Jesus rises victorious from the dead, conquering sin and death forever. Reflect on the hope and joy of Easter morning. Ask for the grace of a strong and unwavering faith.',
    },
    {
      title: 'The Ascension',
      fruit: 'Desire for Heaven',
      reflection:
        'Jesus ascends into heaven, promising to prepare a place for us and to send the Holy Spirit. Reflect on the hope of one day being united with Him in glory. Ask for the grace of a strong desire for heaven.',
    },
    {
      title: 'The Descent of the Holy Spirit',
      fruit: 'Wisdom',
      reflection:
        'The Holy Spirit descends upon the apostles at Pentecost, filling them with courage and wisdom to proclaim the Gospel. Reflect on the gifts of the Spirit poured into your own soul. Ask for the grace of wisdom and a burning love of God.',
    },
    {
      title: 'The Assumption of Mary',
      fruit: 'Devotion to Mary',
      reflection:
        "Mary is assumed body and soul into heaven, the first fruits of Christ's redemption. Reflect on the honor given to the one who said yes to God so completely. Ask for the grace of a happy death and deep devotion to Mary.",
    },
    {
      title: 'The Coronation of Mary',
      fruit: "Trust in Mary's Intercession",
      reflection:
        'Mary is crowned Queen of Heaven and Earth, our mother and advocate. Reflect on her constant intercession for all her children. Ask for the grace of perseverance in faith and trust in her motherly care.',
    },
  ],
  Luminous: [
    {
      title: 'The Baptism in the Jordan',
      fruit: 'Openness to the Holy Spirit',
      reflection:
        "Jesus is baptized by John, and the Father's voice proclaims Him the beloved Son as the Spirit descends like a dove. Reflect on your own baptism and call to be a beloved child of God. Ask for openness to the Holy Spirit's guidance.",
    },
    {
      title: 'The Wedding at Cana',
      fruit: 'Trust in Jesus',
      reflection:
        "At Mary's request, Jesus performs His first public miracle, turning water into wine. Reflect on Mary's simple instruction: ‘Do whatever he tells you.’ Ask for the grace to trust Jesus completely in every need.",
    },
    {
      title: 'The Proclamation of the Kingdom',
      fruit: 'Repentance and Trust in God',
      reflection:
        "Jesus begins His public ministry, calling all to repentance and announcing the Kingdom of God. Reflect on His invitation to conversion and mercy. Ask for the grace of ongoing repentance and trust in God's mercy.",
    },
    {
      title: 'The Transfiguration',
      fruit: 'Desire for Holiness',
      reflection:
        'Jesus is transfigured in glory before Peter, James, and John, revealing His divine nature. Reflect on this glimpse of glory meant to strengthen the apostles for the trials ahead. Ask for the grace to desire holiness and to be transformed by God’s light.',
    },
    {
      title: 'The Institution of the Eucharist',
      fruit: 'Love of the Eucharist',
      reflection:
        'At the Last Supper, Jesus gives Himself entirely under the appearance of bread and wine. Reflect on this ultimate gift of His Body and Blood. Ask for the grace of deep love and reverence for the Eucharist.',
    },
  ],
}
