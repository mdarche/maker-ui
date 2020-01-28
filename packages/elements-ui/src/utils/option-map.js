import merge from 'deepmerge'

import defaultOptions from './default-options'
import defaultTheme from './default-theme'

import layouts from './variants/layouts'
import headers from './variants/headers'
import defaults from './variants/defaults'

const validate = obj =>
  obj !== undefined && typeof obj === 'object' ? obj : {}

const format = value => (isNaN(value) ? value : `${value}px`)

// TODO - Test overwriting default-theme styles and console log the new theme
// TODO - move default styles to demo site

export default (theme, options = defaultOptions, removeStyling = false) => {
  const mappedOptions = {
    sizes: {
      maxWidth_header: options.header.maxWidth,
      maxWidth_topbar: options.topbar.maxWidth,
      maxWidth_content: options.content.maxWidth,
      maxWidth_footer: options.footer.maxWidth,
      width_mobilenav: options.mobileMenu.width,
      width_sidebar: options.sidebar.width,
      width_sidenav: options.sideNav.width,
    },
    breakpoints: [
      format(options.breakpoints.sm),
      format(options.breakpoints.md),
      format(options.breakpoints.lg),
    ],
    gap: {
      gap_content: options.content.gridGap,
    },
    ...layouts,
    ...headers,
    ...(!removeStyling && defaults),
  }

  return merge.all([validate(theme), defaultTheme, mappedOptions])
}
