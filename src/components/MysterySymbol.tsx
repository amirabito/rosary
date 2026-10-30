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

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

function starPoints(cx: number, cy: number, outerR: number, innerR: number, points: number, rotateDeg = -90): string {
  const step = 360 / (points * 2)
  const coords: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const [x, y] = polar(cx, cy, r, rotateDeg + i * step)
    coords.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return coords.join(' ')
}

function ray(cx: number, cy: number, r1: number, r2: number, deg: number) {
  const [x1, y1] = polar(cx, cy, r1, deg)
  const [x2, y2] = polar(cx, cy, r2, deg)
  return { x1, y1, x2, y2 }
}

function Rays({ count, r1, r2, start = 0, end = 360 }: { count: number; r1: number; r2: number; start?: number; end?: number }) {
  const span = end - start
  const step = count > 1 ? span / (count - 1) : 0
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const { x1, y1, x2, y2 } = ray(50, 50, r1, r2, start + i * step)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
      })}
    </>
  )
}

function renderIcon(symbol: SymbolKey) {
  switch (symbol) {
    case 'lily':
      return (
        <g fill="currentColor">
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse key={deg} cx="50" cy="32" rx="8" ry="19" transform={`rotate(${deg} 50 50)`} opacity={0.9} />
          ))}
          <circle cx="50" cy="50" r="5" />
        </g>
      )

    case 'heart':
      return (
        <path
          fill="currentColor"
          d="M50,82 C24,62 14,42 14,28 C14,14 26,6 38,10 C45,12 50,18 50,26 C50,18 55,12 62,10 C74,6 86,14 86,28 C86,42 76,62 50,82 Z"
        />
      )

    case 'star':
      return <polygon fill="currentColor" points={starPoints(50, 50, 32, 13, 5)} />

    case 'candle': {
      return (
        <g fill="currentColor">
          <rect x="40" y="45" width="20" height="38" rx="2" />
          <line x1="50" y1="38" x2="50" y2="45" stroke="currentColor" strokeWidth={3} />
          <ellipse cx="50" cy="28" rx="7" ry="11" />
        </g>
      )
    }

    case 'scroll':
      return (
        <g fill="currentColor">
          <rect x="26" y="40" width="48" height="20" />
          <ellipse cx="26" cy="50" rx="7" ry="15" />
          <ellipse cx="74" cy="50" rx="7" ry="15" />
          <line x1="36" y1="46" x2="64" y2="46" stroke="#1a0a10" strokeWidth={2.5} opacity={0.6} strokeLinecap="round" />
          <line x1="36" y1="54" x2="58" y2="54" stroke="#1a0a10" strokeWidth={2.5} opacity={0.6} strokeLinecap="round" />
        </g>
      )

    case 'olive-branch':
      return (
        <g>
          <path d="M18,76 Q50,46 82,24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" />
          {[
            [28, 66],
            [40, 56],
            [52, 46],
            [64, 36],
            [74, 28],
          ].map(([x, y], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="8"
              ry="4"
              fill="currentColor"
              transform={`rotate(${-35 + i * 2} ${x} ${y})`}
            />
          ))}
        </g>
      )

    case 'pillar':
      return (
        <g fill="currentColor">
          <rect x="22" y="18" width="56" height="9" rx="1.5" />
          <rect x="38" y="27" width="24" height="48" />
          <rect x="18" y="75" width="64" height="10" rx="1.5" />
        </g>
      )

    case 'thorn-crown':
      return (
        <g>
          <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth={5} />
          {Array.from({ length: 10 }, (_, i) => {
            const deg = i * 36
            const [bx1, by1] = polar(50, 50, 22, deg - 6)
            const [bx2, by2] = polar(50, 50, 22, deg + 6)
            const [tx, ty] = polar(50, 50, 36, deg)
            return (
              <polygon
                key={i}
                points={`${bx1.toFixed(1)},${by1.toFixed(1)} ${bx2.toFixed(1)},${by2.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}`}
                fill="currentColor"
              />
            )
          })}
        </g>
      )

    case 'cross':
    case 'cross-tilted':
      return (
        <g transform={symbol === 'cross-tilted' ? 'rotate(22 50 50)' : undefined}>
          <rect x="43" y="14" width="14" height="72" rx="2" fill="currentColor" />
          <rect x="24" y="34" width="52" height="14" rx="2" fill="currentColor" />
        </g>
      )

    case 'sunrise':
      return (
        <g>
          <Rays count={7} r1={30} r2={42} start={200} end={340} />
          <path d="M20,64 A30,30 0 0 1 80,64 Z" fill="currentColor" />
          <line x1="14" y1="64" x2="86" y2="64" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
        </g>
      )

    case 'cloud':
      return (
        <g fill="currentColor">
          <circle cx="36" cy="54" r="14" />
          <circle cx="54" cy="46" r="18" />
          <circle cx="70" cy="56" r="12" />
          <rect x="26" y="54" width="56" height="18" rx="9" />
        </g>
      )

    case 'dove':
      return (
        <g>
          <path
            d="M14,58 Q32,30 50,50 Q68,30 86,58"
            fill="none"
            stroke="currentColor"
            strokeWidth={7}
            strokeLinecap="round"
          />
          <circle cx="50" cy="48" r="7" fill="currentColor" />
        </g>
      )

    case 'moon-stars':
      return (
        <g fill="currentColor">
          <path d="M58,22 A28,28 0 1 0 58,78 A22,22 0 1 1 58,22 Z" />
          {[
            [78, 30, 6],
            [84, 50, 4.5],
            [72, 66, 5],
          ].map(([cx, cy, s], i) => (
            <polygon key={i} points={starPoints(cx, cy, s, s * 0.4, 4)} />
          ))}
        </g>
      )

    case 'crown':
      return (
        <g fill="currentColor">
          <polygon points="20,70 20,42 34,56 50,28 66,56 80,42 80,70" />
          <rect x="18" y="70" width="64" height="10" rx="2" />
          <circle cx="50" cy="30" r="4.5" />
          <circle cx="23" cy="44" r="3.5" />
          <circle cx="77" cy="44" r="3.5" />
        </g>
      )

    case 'chalice':
      return (
        <g fill="currentColor">
          <ellipse cx="50" cy="30" rx="21" ry="6.5" />
          <polygon points="29,30 71,30 58,64 42,64" />
          <rect x="46" y="64" width="8" height="18" />
          <ellipse cx="50" cy="85" rx="17" ry="5" />
        </g>
      )

    case 'mountain':
      return (
        <g fill="currentColor">
          <circle cx="74" cy="26" r="8" opacity={0.9} />
          <polygon points="12,78 38,32 58,62 72,42 90,78" />
        </g>
      )

    case 'sunburst':
      return (
        <g>
          <Rays count={12} r1={26} r2={40} />
          <circle cx="50" cy="50" r="18" fill="currentColor" />
        </g>
      )

    default:
      return null
  }
}

export function MysterySymbol({ symbol, className }: { symbol: SymbolKey; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {renderIcon(symbol)}
    </svg>
  )
}
