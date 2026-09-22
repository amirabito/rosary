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
      artwork: {
        title: 'The Annunciation',
        artist: 'Fra Angelico',
        year: 'c. 1440–1445',
        wikiQuery: 'Fra Angelico Annunciation San Marco painting',
      },
    },
    {
      title: 'The Visitation',
      fruit: 'Love of Neighbor',
      reflection:
        "Mary hurries to help her cousin Elizabeth, carrying Christ within her. Consider how Mary's charity moved her to serve others right away, without hesitation. Ask for a heart that brings Christ to everyone you meet.",
      artwork: {
        title: 'The Visitation',
        artist: 'Domenico Ghirlandaio',
        year: '1491',
        wikiQuery: 'Domenico Ghirlandaio The Visitation painting',
      },
    },
    {
      title: 'The Nativity',
      fruit: 'Poverty of Spirit',
      reflection:
        'Jesus is born in a stable, poor and humble, yet He is the King of Kings. Reflect on the simplicity that surrounded His birth. Ask for the grace of detachment from worldly comfort and possessions.',
      artwork: {
        title: 'Mystic Nativity',
        artist: 'Sandro Botticelli',
        year: '1500',
        wikiQuery: 'Sandro Botticelli Mystic Nativity painting',
      },
    },
    {
      title: 'The Presentation',
      fruit: 'Obedience',
      reflection:
        "Mary and Joseph present the infant Jesus in the Temple, fulfilling the Law, and Simeon prophesies the sword that will pierce Mary's heart. Reflect on their obedience even amid the sorrow to come. Ask for the grace to remain obedient to God even when the path ahead is unclear.",
      artwork: {
        title: 'Presentation at the Temple',
        artist: 'Ambrogio Lorenzetti',
        year: '1342',
        wikiQuery: 'Ambrogio Lorenzetti Presentation at the Temple painting',
      },
    },
    {
      title: 'The Finding in the Temple',
      fruit: 'Joy in Finding Jesus',
      reflection:
        'After three anxious days, Mary and Joseph find the boy Jesus teaching in the Temple. Reflect on the joy and relief of finding Christ after a time of searching. Ask for the grace to seek Jesus earnestly whenever He seems distant.',
      artwork: {
        title: 'The Finding of the Saviour in the Temple',
        artist: 'William Holman Hunt',
        year: '1860',
        wikiQuery: 'William Holman Hunt The Finding of the Saviour in the Temple',
      },
    },
  ],
  Sorrowful: [
    {
      title: 'The Agony in the Garden',
      fruit: "Conformity to God's Will",
      reflection:
        "Jesus sweats blood in Gethsemane, accepting the Father's will though His human nature recoils from the suffering ahead. Reflect on Christ's total surrender: ‘not as I will, but as you will.’ Ask for the grace to accept God's will even in your own trials.",
      artwork: {
        title: 'Agony in the Garden',
        artist: 'Giovanni Bellini',
        year: 'c. 1465',
        wikiQuery: 'Giovanni Bellini Agony in the Garden painting',
      },
    },
    {
      title: 'The Scourging at the Pillar',
      fruit: 'Purity',
      reflection:
        'Jesus is bound and brutally scourged for our sins. Reflect on the physical suffering He endured out of love for you. Ask for the grace of purity and the strength to master your own desires.',
      artwork: {
        title: 'The Flagellation of Christ',
        artist: 'Caravaggio',
        year: '1607',
        wikiQuery: 'Caravaggio The Flagellation of Christ Capodimonte painting',
      },
    },
    {
      title: 'The Crowning with Thorns',
      fruit: 'Moral Courage',
      reflection:
        'Soldiers mock Jesus as king, pressing a crown of thorns into His head. Reflect on the humiliation Christ accepted willingly to atone for our pride. Ask for the courage to endure ridicule and stand firm in your faith.',
      artwork: {
        title: 'The Crowning with Thorns',
        artist: 'Titian',
        year: '1542',
        wikiQuery: 'Titian The Crowning with Thorns Louvre painting',
      },
    },
    {
      title: 'The Carrying of the Cross',
      fruit: 'Patience',
      reflection:
        'Jesus carries the heavy cross toward Calvary, falling beneath its weight yet pressing on. Reflect on His patient endurance and the help of Simon of Cyrene. Ask for the grace to carry your own daily crosses with patience.',
      artwork: {
        title: 'Christ Carrying the Cross',
        artist: 'Titian',
        year: 'c. 1565',
        wikiQuery: 'Titian Christ Carrying the Cross painting',
      },
    },
    {
      title: 'The Crucifixion',
      fruit: 'Self-Denial',
      reflection:
        'Jesus dies on the cross, offering His life completely for the salvation of the world. Reflect on the depth of love shown in this final sacrifice. Ask for the grace to die to self and live for God and others.',
      artwork: {
        title: 'Christ Crucified',
        artist: 'Diego Velázquez',
        year: '1632',
        wikiQuery: 'Diego Velázquez Christ Crucified Prado painting',
      },
    },
  ],
  Glorious: [
    {
      title: 'The Resurrection',
      fruit: 'Faith',
      reflection:
        'Jesus rises victorious from the dead, conquering sin and death forever. Reflect on the hope and joy of Easter morning. Ask for the grace of a strong and unwavering faith.',
      artwork: {
        title: 'The Resurrection',
        artist: 'Piero della Francesca',
        year: 'c. 1463–1465',
        wikiQuery: 'Piero della Francesca The Resurrection painting Sansepolcro',
      },
    },
    {
      title: 'The Ascension',
      fruit: 'Desire for Heaven',
      reflection:
        'Jesus ascends into heaven, promising to prepare a place for us and to send the Holy Spirit. Reflect on the hope of one day being united with Him in glory. Ask for the grace of a strong desire for heaven.',
      artwork: {
        title: 'The Ascension of Christ',
        artist: 'Rembrandt',
        year: '1636',
        wikiQuery: 'Rembrandt The Ascension of Christ painting',
      },
    },
    {
      title: 'The Descent of the Holy Spirit',
      fruit: 'Wisdom',
      reflection:
        'The Holy Spirit descends upon the apostles at Pentecost, filling them with courage and wisdom to proclaim the Gospel. Reflect on the gifts of the Spirit poured into your own soul. Ask for the grace of wisdom and a burning love of God.',
      artwork: {
        title: 'Pentecost',
        artist: 'El Greco',
        year: 'c. 1596–1600',
        wikiQuery: 'El Greco Pentecost painting Prado',
      },
    },
    {
      title: 'The Assumption of Mary',
      fruit: 'Devotion to Mary',
      reflection:
        "Mary is assumed body and soul into heaven, the first fruits of Christ's redemption. Reflect on the honor given to the one who said yes to God so completely. Ask for the grace of a happy death and deep devotion to Mary.",
      artwork: {
        title: 'Assumption of the Virgin',
        artist: 'Titian',
        year: '1516–1518',
        wikiQuery: 'Titian Assumption of the Virgin Frari painting',
      },
    },
    {
      title: 'The Coronation of Mary',
      fruit: "Trust in Mary's Intercession",
      reflection:
        'Mary is crowned Queen of Heaven and Earth, our mother and advocate. Reflect on her constant intercession for all her children. Ask for the grace of perseverance in faith and trust in her motherly care.',
      artwork: {
        title: 'The Coronation of the Virgin',
        artist: 'Diego Velázquez',
        year: 'c. 1641–1644',
        wikiQuery: 'Diego Velázquez The Coronation of the Virgin painting',
      },
    },
  ],
  Luminous: [
    {
      title: 'The Baptism in the Jordan',
      fruit: 'Openness to the Holy Spirit',
      reflection:
        "Jesus is baptized by John, and the Father's voice proclaims Him the beloved Son as the Spirit descends like a dove. Reflect on your own baptism and call to be a beloved child of God. Ask for openness to the Holy Spirit's guidance.",
      artwork: {
        title: 'The Baptism of Christ',
        artist: 'Piero della Francesca',
        year: 'c. 1448–1450',
        wikiQuery: 'Piero della Francesca The Baptism of Christ painting',
      },
    },
    {
      title: 'The Wedding at Cana',
      fruit: 'Trust in Jesus',
      reflection:
        "At Mary's request, Jesus performs His first public miracle, turning water into wine. Reflect on Mary's simple instruction: ‘Do whatever he tells you.’ Ask for the grace to trust Jesus completely in every need.",
      artwork: {
        title: 'The Wedding at Cana',
        artist: 'Paolo Veronese',
        year: '1563',
        wikiQuery: 'Paolo Veronese The Wedding at Cana painting Louvre',
      },
    },
    {
      title: 'The Proclamation of the Kingdom',
      fruit: 'Repentance and Trust in God',
      reflection:
        "Jesus begins His public ministry, calling all to repentance and announcing the Kingdom of God. Reflect on His invitation to conversion and mercy. Ask for the grace of ongoing repentance and trust in God's mercy.",
      artwork: {
        title: 'The Sermon of the Beatitudes',
        artist: 'James Tissot',
        year: 'c. 1886–1896',
        wikiQuery: 'James Tissot The Sermon of the Beatitudes painting',
      },
    },
    {
      title: 'The Transfiguration',
      fruit: 'Desire for Holiness',
      reflection:
        'Jesus is transfigured in glory before Peter, James, and John, revealing His divine nature. Reflect on this glimpse of glory meant to strengthen the apostles for the trials ahead. Ask for the grace to desire holiness and to be transformed by God’s light.',
      artwork: {
        title: 'The Transfiguration',
        artist: 'Raphael',
        year: '1516–1520',
        wikiQuery: 'Raphael The Transfiguration painting Vatican',
      },
    },
    {
      title: 'The Institution of the Eucharist',
      fruit: 'Love of the Eucharist',
      reflection:
        'At the Last Supper, Jesus gives Himself entirely under the appearance of bread and wine. Reflect on this ultimate gift of His Body and Blood. Ask for the grace of deep love and reverence for the Eucharist.',
      artwork: {
        title: 'The Last Supper',
        artist: 'Leonardo da Vinci',
        year: '1495–1498',
        wikiQuery: 'Leonardo da Vinci The Last Supper painting',
      },
    },
  ],
}
