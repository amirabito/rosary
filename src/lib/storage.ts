const KEY = 'rosary:prefs'

export interface Prefs {
  decadeCount: number
}

const DEFAULT_PREFS: Prefs = { decadeCount: 5 }

export function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_PREFS
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_PREFS
  }
}

export function savePrefs(prefs: Prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs))
  } catch {
    // localStorage unavailable (e.g. private browsing) — preference just won't persist
  }
}
