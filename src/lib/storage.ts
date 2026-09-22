const KEY = 'rosary:prefs'

export interface Prefs {
  selectedIndices: number[]
}

const DEFAULT_PREFS: Prefs = { selectedIndices: [0, 1, 2, 3, 4] }

export function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_PREFS
    const parsed = { ...DEFAULT_PREFS, ...JSON.parse(raw) }
    if (!Array.isArray(parsed.selectedIndices) || parsed.selectedIndices.length === 0) {
      return DEFAULT_PREFS
    }
    return parsed
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
