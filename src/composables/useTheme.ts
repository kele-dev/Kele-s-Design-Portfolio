import { ref, computed } from 'vue'

export interface Theme {
  primary: string
  primaryRgb: string
  accent: string
  accentRgb: string
  primaryText: string
  onPrimary: string
}

export const themes: Theme[] = [
  {
    primary: '#0066e2',
    primaryRgb: '0, 102, 226',
    accent: '#ffd200',
    accentRgb: '255, 210, 0',
    primaryText: '#66A3EE',
    onPrimary: '#ffffff'
  },
  {
    primary: '#8a2be2', // Neon Purple
    primaryRgb: '138, 43, 226',
    accent: '#39ff14', // Neon Green
    accentRgb: '57, 255, 20',
    primaryText: '#B980EE',
    onPrimary: '#ffffff'
  },
  {
    primary: '#ff5e00', // Vivid Orange
    primaryRgb: '255, 94, 0',
    accent: '#00e5ff', // Neon Cyan
    accentRgb: '0, 229, 255',
    primaryText: '#ff5e00',
    onPrimary: '#0a0a0c'
  },
  {
    primary: '#ff007f', // Electric Pink
    primaryRgb: '255, 0, 127',
    accent: '#00f6ff', // Electric Cyan
    accentRgb: '0, 246, 255',
    primaryText: '#ff007f',
    onPrimary: '#0a0a0c'
  }
]

const STORAGE_KEY = 'kele-theme-index'

// Read the saved theme once at module load; validate so a stale/corrupt value
// falls back to the default instead of breaking the accent angle math.
const storedIndex = (() => {
  if (typeof window === 'undefined') return 0
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw === null) return 0
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed >= 0 && parsed < themes.length ? parsed : 0
})()

export function useTheme() {
  const currentThemeIndex = ref(storedIndex)
  // Seed the semicircle angle from the persisted index so the icon matches
  // the theme on first paint instead of always starting at 0deg.
  const themeAngle = ref(storedIndex * (360 / themes.length))

  const themeStyles = computed(() => {
    const theme = themes[currentThemeIndex.value]
    return {
      '--color-primary': theme.primary,
      '--color-primary-rgb': theme.primaryRgb,
      '--color-accent': theme.accent,
      '--color-accent-rgb': theme.accentRgb,
      '--color-primary-text': theme.primaryText,
      '--color-on-primary': theme.onPrimary
    }
  })

  const cycleTheme = () => {
    currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length
    // 360 / themes.length so a full cycle lands the semicircle back where it started
    themeAngle.value += 360 / themes.length
    window.localStorage.setItem(STORAGE_KEY, String(currentThemeIndex.value))
  }

  return { currentThemeIndex, themeAngle, themeStyles, cycleTheme }
}
