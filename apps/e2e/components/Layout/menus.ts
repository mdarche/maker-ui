import type { MakerMenu } from 'maker-ui'

/**
 * Primary header menu
 */
export const primary_menu: MakerMenu = [
  { label: 'Home', path: '/' },
  {
    label: 'Components',
    path: '/accordion',
    submenu: [
      { label: 'Accordion', path: '/accordion' },
      { label: 'Generative', path: '/generative' },
      { label: 'Modal', path: '/modal' },
      { label: 'Popovers', path: '/popovers' },
      { label: 'Tabs', path: '/tabs' },
      { label: 'Table of Contents', path: '/toc' },
      { label: 'Lightbox', path: '/lightbox' },
      { label: 'Loaders', path: '/loaders' },
      { label: 'Toasts', path: '/toasts' },
      { label: 'Transition', path: '/transition' },
      { label: 'Carousel', path: '/carousel' },
    ],
  },
  {
    label: 'Forms',
    path: '/forms',
    submenu: [
      { label: 'ImagePicker', path: '/forms/image-picker' },
      { label: 'Conditional', path: '/forms/conditional' },
    ],
  },
  {
    label: 'GSAP',
    path: '/gsap/carousel',
    submenu: [
      { label: 'Carousel', path: '/gsap/carousel' },
      { label: 'Parallax', path: '/gsap/parallax' },
      { label: 'ScrollReveal', path: '/gsap/scrollreveal' },
    ],
  },
  {
    label: 'Content Layouts',
    path: '/layouts/basic',
    submenu: [
      { label: 'Basic', path: '/layouts/basic' },
      { label: 'Sidebar Right', path: '/layouts/sidebar-right' },
      { label: 'Sidebar Left', path: '/layouts/sidebar-left' },
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
