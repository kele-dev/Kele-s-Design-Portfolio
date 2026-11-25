import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Global error handler: an uncaught error in any component must never leave a
// silently blank page; log it so the failure is at least observable.
app.config.errorHandler = (err, _instance, info) => {
  console.error(`[app-error] ${info}:`, err)
}

app.use(MotionPlugin)
// Non-blocking Google Fonts load (CSP-safe: no inline event handlers).
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap'
const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = FONT_CSS
document.head.appendChild(fontLink)

app.mount('#app')

