import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { MotionPlugin } from '@vueuse/motion'
import App from '../App.vue'
import PortfolioGrid from '../components/PortfolioGrid.vue'
import { projects, headlines } from '../content'

// jsdom lacks rAF/matchMedia bits the animated components touch.
vi.stubGlobal('requestAnimationFrame', (_cb: FrameRequestCallback) => {
  return 0 as unknown as number
})
vi.stubGlobal('cancelAnimationFrame', () => {})
if (typeof window.matchMedia !== 'function') {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }))
}

describe('App smoke (must-not-fail surface)', () => {
  it('renders the hero headline and all four case studies', async () => {
    const wrapper = mount(App, {
      global: { plugins: [MotionPlugin] },
    })
    await flushPromises()

    const h1 = wrapper.get('h1.hero-title')
    expect(h1.text()).toContain(headlines[0].line1)
    expect(h1.text()).toContain('Through Design.')

    const cards = wrapper.findAll('.project-card')
    expect(cards.length).toBe(projects.length)
    expect(cards.length).toBeGreaterThanOrEqual(4)

    const contact = wrapper.get('a[href^="mailto:"]')
    expect(contact.text()).toContain('kele.designid@gmail.com')
  })
})

describe('PortfolioGrid deep links', () => {
  it('opens the matching case study from the hash', async () => {
    window.location.hash = `#/case/${projects[0].slug}`
    const wrapper = mount(PortfolioGrid, { attachTo: document.body })
    await flushPromises()

    // The modal is teleported to document.body, outside the wrapper.
    const modal = document.querySelector('.modal-overlay, .project-modal, [role="dialog"]')
    expect(modal).toBeTruthy()
    wrapper.unmount()
    window.location.hash = ''
  })
})
