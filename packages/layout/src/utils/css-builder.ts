import type { GlobalProps, ResponsiveScale } from '@maker-ui/css'
import { merge, format } from '@maker-ui/utils'

import { defaultOptions } from '../options'
import { MakerOptions } from '../types'

interface Dictionary<T> {
  [id: string]: T
}

/**
 * Converts colors from the Maker UI options configuration into CSS variables
 *
 * @param colors - the `colors` object from MakerOptions
 * @returns CSS variable declarations scoped to body dataset attribute or :root
 *
 * @internal usage only
 */
export const colorVars = (
  colors: MakerOptions['colors']
): GlobalProps['styles'] => {
  const themeKeys = Object.keys(colors)
  const hasThemeName = colors && typeof colors[themeKeys[0]] === 'object'
  let css: any = hasThemeName ? {} : { ':root': {} }

  themeKeys.forEach((k) => {
    // Handle multiple themes
    if (hasThemeName) {
      const selector = `body[data-theme='${k}']`
      let styles: Dictionary<any> = { [selector]: {} }

      for (const [key, value] of Object.entries(colors[k])) {
        styles[selector][`--color-${key}`] = value
      }
      css = { ...css, ...styles }
    } else {
      // Handle single theme
      css[':root'][`--color-${k}`] = colors[k]
    }
  })

  return css
}

/**
 * Converts relevant `MakerOptions` into CSS variables with
 * media query support
 *
 * @param {Object} options - the entire options object
 * @returns CSS variable declarations for Emotion <Global />
 *
 * @internal usage only
 */
export const themeVars = (
  options: Partial<MakerOptions>
): GlobalProps['styles'] => {
  const {
    breakpoints,
    fonts,
    topbar,
    header,
    mobileMenu,
    variables,
    content,
    sidebar,
    sideNav,
    footer,
  } = merge(defaultOptions, options, {
    arrayMerge: (_, source, __) => source,
  })

  const mq: string[] = breakpoints.map(
    (bp: string | number) => `@media(min-width: ${format(bp)})`
  )
  let css: Dictionary<any> = {}
  let vars: { [key: string]: ResponsiveScale } = {}

  /** Assign custom css variables */
  for (const [key, value] of Object.entries(variables)) {
    vars[`--${key}`] = value
  }

  /** Assign width and max-width layout values */
  const measurements = {
    '--maxWidth_header': header?.maxWidth,
    '--maxWidth_topbar': topbar?.maxWidth,
    '--maxWidth_content': content?.maxWidth,
    '--maxWidth_section': content?.maxWidthSection,
    '--maxWidth_footer': footer?.maxWidth,
    '--width_mobileMenu': mobileMenu?.width,
    '--width_sidebar': sidebar?.width,
    '--width_second_sidebar': sidebar?.width_2,
    '--width_sideNav': sideNav?.width,
    '--gap_content': sidebar?.sidebarGap,
  }

  function formatCssVars(obj: object) {
    for (const [key, value] of Object.entries(obj)) {
      if (value) {
        if (Array.isArray(value)) {
          let styles: Dictionary<any> = {}

          styles[key] = format(value[0])

          value.forEach((v, index) => {
            if (index !== 0) {
              styles[mq[index]] = { [key]: format(v) }
            }
          })
          css = merge(css, styles)
        } else {
          css[key] = format(value)
        }
      }
    }
  }

  formatCssVars(measurements)
  formatCssVars(vars)

  /** Assign font family declarations */
  for (const [key, value] of Object.entries(fonts)) {
    css[`--font-${key}`] = value
  }

  /** Add breakpoints to variable string for external usage */
  css['--breakpoints'] = breakpoints.join(',')

  return { ':root': css }
}
