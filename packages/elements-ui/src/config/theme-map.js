import merge from 'deepmerge'

import defaultOptions from './options'
import layouts from './variants/layouts'
import headers from './variants/headers'

const validate = obj =>
  obj !== undefined && typeof obj === 'object' ? obj : {}

const format = value => (isNaN(value) ? value : `${value}px`)

// TODO - Test overwriting default-theme styles and console log the new theme

export default (theme, options = defaultOptions) => {
  const mappedOptions = {
    colors: {
      bg_topbar: '#355cac',
      bg_header: '#fff',
      bg_mobileMenu: 'rgba(0, 0, 0, 0.9)',
      bg_sideNav: '#333',
      bg_footer: '#fff',
    },
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    lineHeights: {
      body: 1.5,
      heading: 1.125,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    breakpoints: ['750px', '960px', '1240px'],
    sizes: {
      maxWidth_header: options.header.maxWidth,
      maxWidth_topbar: options.topbar.maxWidth,
      maxWidth_content: options.content.maxWidth,
      maxWidth_section: options.content.maxWidthSection,
      maxWidth_footer: options.footer.maxWidth,
      width_mobileMenu: options.mobileMenu.width,
      width_sidebar: options.sidebar.width,
      width_sideNav: options.sideNav.width,
    },
    // breakpoints: [
    //   format(options.breakpoints.sm),
    //   format(options.breakpoints.md),
    //   format(options.breakpoints.lg),
    // ],
    gap: {
      gap_content: options.content.sidebarGap,
    },
    ...layouts,
    ...headers,
  }

  return merge.all([mappedOptions, validate(theme)])
}
