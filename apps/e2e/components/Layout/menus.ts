import { MakerMenu } from 'maker-ui'

/**
 * Primary header menu
 */
export const primary_menu: MakerMenu = [
  { label: 'Home', path: '/' },
  {
    label: 'Components',
    submenu: [
      { label: 'Accordion', path: '/accordion' },
      { label: 'Generative', path: '/generative' },
      { label: 'Modal', path: '/modal' },
      { label: 'Popovers', path: '/popovers' },
      { label: 'Tabs', path: '/tabs' },
      { label: 'Table of Contents', path: '/toc' },
      { label: 'Old Carousel', path: '/carousel' },
    ],
  },
  { label: 'Forms', path: '/forms' },
  {
    label: 'GSAP',
    path: '/gsap/carousel',
    submenu: [
      { label: 'Carousel', path: '/gsap/carousel' },
      { label: 'Parallax', path: '/gsap/parallax' },
      { label: 'ScrollReveal', path: '/gsap/scrollreveal' },
    ],
  },
]

/**
 * Mobile menu
 */
export const mobile_menu: MakerMenu = [
  { label: '', path: '/' },
  { label: '', path: '/' },
  { label: '', path: '/' },
]
