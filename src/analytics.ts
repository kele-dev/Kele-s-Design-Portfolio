// Lightweight, privacy-friendly event tracking.
// Events are pushed to window.dataLayer (consumable by any analytics tool the
// owner later wires up: Plausible, Umami, GTM, ...) and mirrored to console +
// localStorage so the contact conversion path stays observable with zero
// third-party requests.

type TrackEvent = { event: string; label?: string; ts: string }

const STORAGE_KEY = 'kele-events'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function trackEvent(event: string, label?: string): void {
  const entry: TrackEvent = { event, label, ts: new Date().toISOString() }
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(entry)
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const history: TrackEvent[] = raw ? JSON.parse(raw) : []
    history.push(entry)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-200)))
  } catch {
    // Storage unavailable (private mode): dataLayer + console are enough.
  }
  console.info('[analytics]', event, label ?? '')
}
