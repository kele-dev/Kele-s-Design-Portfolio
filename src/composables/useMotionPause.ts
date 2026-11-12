import { ref, watch } from 'vue'

// Pause ambient CSS animations. Starts paused when the OS asks for reduced motion.
export function useMotionPause() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const motionPaused = ref(prefersReduced)

  watch(
    motionPaused,
    (paused) => {
      document.documentElement.classList.toggle('motion-paused', paused)
    },
    { immediate: true }
  )

  const toggleMotion = () => {
    motionPaused.value = !motionPaused.value
  }

  return { motionPaused, toggleMotion }
}
