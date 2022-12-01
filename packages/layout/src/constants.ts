/**
 * All configurations for `<Content>` layouts.
 */
export const contentTypes = [
  'content sidebar',
  'content sidenav',
  'content',
  'sidebar content',
  'sidebar content sidebar',
  'sidenav content',
] as const

/**
 * All configurations for `<Navbar>` layouts.
 */
export const navTypes = [
  'basic',
  'basic-left',
  'basic-center',
  'center',
  'split',
  'minimal',
  'minimal-left',
  'minimal-center',
  'reverse',
] as const

/**
 * All configurations for mobile `<Navbar>` layouts.
 */
export const mobileNavTypes = [
  'basic',
  'basic-menu-left',
  'logo-center',
  'logo-center-alt',
] as const

/**
 * All configurations for `<MobileMenu>` transitions.
 */
export const transitionTypes = [
  'fade',
  'fade-up',
  'fade-down',
  'slide-left',
  'slide-right',
] as const
