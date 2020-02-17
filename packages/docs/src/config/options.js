export const options = {
  navigation: 'basic-left',
  layout: 'content-sidenav',
  header: {
    maxWidth: 1460,
    sticky: true,
    stickyMobile: true,
    colorToggle: true,
    hideColorToggleOnMobile: false,
    hideWidgetsOnMobile: false,
  },
  mobileMenu: {
    width: [300, '30vw'],
    transition: 'slideLeft',
    visibleOnDesktop: false,
  },
  sideNav: {
    width: ['60vw', 600],
    isPrimaryNav: true,
  },
  content: {
    maxWidth: 1020,
  },
}

export const menu = [
  { label: 'Docs', path: '/docs/getting-started' },
  { label: 'Tutorials', path: '/tutorials' },
  { label: 'Demo Site', path: '/demo' },
  { label: 'FAQs', path: '/faqs' },
]
