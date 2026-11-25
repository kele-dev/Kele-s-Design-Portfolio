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
app.mount('#app')

