import { GlobalProps } from '@maker-ui/css'
import merge from 'deepmerge'

import { defaultOptions } from '../options'
import { format } from './helper'
import { MakerOptions } from '../types'

interface Dictionary<T> {
  [id: string]: T
}

/**
 * Converts colors from the Maker UI options configuration into CSS variables
 *
 * @param colors - the `colors` object from MakerOptions
 * @returns CSS variable declarations scoped to body dataset attribute
 *
 * @internal usage only
 */

export const colorVars = (
  colors: MakerOptions['colors']
): GlobalProps['styles'] => {
  const themeKeys = Object.keys(colors)
  let css = {}

  themeKeys.forEach(k => {
    const selector = `body[data-theme='${k}']`
    let styles: Dictionary<any> = { [selector]: {} }

    for (const [key, value] of Object.entries(colors[k])) {
      styles[selector][`--color-${key}`] = value
    }

    css = { ...css, ...styles }
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
    workspace,
  } = merge(defaultOptions, options, { arrayMerge: (_, source, __) => source })

  const mq: string[] = breakpoints.map(
    (bp: string | number) => `@media(min-width: ${format(bp)})`
  )
  let css: Dictionary<any> = {}

  /** Assign width and max-width layout values */
  const measurements = {
    '--maxWidth_header': header.maxWidth,
    '--maxWidth_topbar': topbar.maxWidth,
    '--maxWidth_content': content.maxWidth,
    '--maxWidth_section': content.maxWidthSection,
    '--maxWidth_footer': footer.maxWidth,
    '--maxWidth_workspace': workspace?.canvasMaxWidth,
    '--width_mobileMenu': mobileMenu.width,
    '--width_sidebar': sidebar.width,
    '--width_second_sidebar': sidebar.secondWidth,
    '--width_sideNav': sideNav.width,
    '--width_dock': workspace.dock?.width,
    '--width_panel_left': workspace.panelLeft?.width,
    '--width_panel_left_collapse': workspace.panelLeft?.collapseWidth,
    '--width_panel_right': workspace.panelRight?.width,
    '--width_panel_right_collapse': workspace.panelRight?.collapseWidth,
    '--gap_content': content.sidebarGap,
  }

  for (const [key, value] of Object.entries(measurements)) {
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

  /** Assign font family declarations */
  for (const [key, value] of Object.entries(fonts)) {
    css[`--font-${key}`] = value
  }

  /** Assign custom css variables */
  for (const [key, value] of Object.entries(variables)) {
    css[`--${key}`] = format(value)
    // let obj: { [key: string]: string } = {}
    // if (value) {
    //   for (const [k, v] of Object.entries(value)) {
    //     obj[`--${key}-${k}`] = format(v)
    //   }
    // }
    // css = { css, ...obj }
  }

  /** Add breakpoints to variable string for external usage */
  css['--breakpoints'] = breakpoints.join(',')

  return { html: css }
}
