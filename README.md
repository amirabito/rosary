# Rosary

A mobile-friendly, guided Rosary app. All data is stored locally in the browser (`localStorage`) — no backend required.

## Features

- **Mystery of the day** — automatically shows the Joyful, Sorrowful, Glorious, or Luminous Mysteries based on the day of the week (with the option to pray a different set instead).
- **Choose which mysteries to pray** — nothing is pre-selected; tap any of the day's five mysteries to focus on just those, or "Select full Rosary" for all five. Picking fewer than all five skips straight to the first chosen mystery's meditation, with no opening prayers.
- **Mental reflection** for every mystery — a short meditation and its traditional "fruit" to focus your prayer, alongside a famous painting depicting the mystery, looked up live from Wikipedia (no bundled image files, and it fails silently if offline or no match is found).
- **Rosary bead visual** — a row of beads tracks which Hail Mary you're on within the current decade (or the three opening Hail Marys).
- **Tap anywhere to continue** — the whole prayer card advances to the next prayer; a small "‹ Back" control sits in the corner if you need to go back.
- **Works offline** — installable as a PWA with a service worker that caches the app shell, so the prayers themselves work with no connection (only the artwork lookup needs a network).
- **Step-by-step, easy-to-follow flow** — every prayer (Sign of the Cross, Apostles' Creed, Our Father, Hail Mary, Glory Be, Fatima Prayer, Hail Holy Queen, closing prayer) is shown in full, one at a time, with a progress bar.

## Development

```sh
npm install
npm run dev      # start local dev server
npm run build    # type-check and build for production
```
