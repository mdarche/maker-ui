import { GlobalProps } from '@emotion/react'
import merge from 'deepmerge'

import { defaultOptions } from '../options'
import { format } from './helper'
import { MakerOptions } from '../types'

/**
 * Converts the colors from the Maker UI options configuration into CSS variables
 *
 * @param {Object} colors - the `colors` object from MakerOptions
 * @returns body dataset-scoped CSS variable declarations
 *
 * @internal usage only
 */
export const colorVars = ({
  initialTheme,
  ...colorModes
}: MakerOptions['colors']): GlobalProps['styles'] => {
  const themeKeys = Object.keys(colorModes)
  let css = {}

  themeKeys.forEach(k => {
    const selector = `body[data-theme='${k}']`
    let styles = { [selector]: {} }

    for (const [key, value] of Object.entries(colorModes[k])) {
      styles[selector][`--color-${key}`] = value
    }

    css = { ...css, ...styles }
  })

  return css
}

/**
 * Converts relevant `MakerOptions` values into CSS variables with
 * media query support
 *
 * @param {Object} options - the entire options object
 * @returns global CSS variable declarations
 *
 * @internal usage only
 */
export const themeVars = (options: MakerOptions): GlobalProps['styles'] => {
  const {
    breakpoints,
    fonts,
    topbar,
    header,
    mobileMenu,
    content,
    sidebar,
    sideNav,
    footer,
    workspace,
  } = merge(defaultOptions, options)
  // @ts-ignore
  const mq: string[] = breakpoints.map(
    (bp: string | number) => `@media(min-width: ${format(bp)})`
  )
  let css = {}

  /**
   * Handle width and max-width layout values
   */
  const measurements = {
    '--maxWidth_header': header.maxWidth,
    '--maxWidth_topbar': topbar.maxWidth,
    '--maxWidth_content': content.maxWidth,
    '--maxWidth_section': content.maxWidthSection,
    '--maxWidth_footer': footer.maxWidth,
    '--maxWidth_workspace': workspace?.canvasMaxWidth,
    '--width_mobileMenu': mobileMenu.width,
    '--width_sidebar': sidebar.width,
    '--width_sideNav': sideNav.width,
    '--width_dock': workspace.dock.width,
    '--width_panel_left': workspace.panelLeft.width,
    '--width_panel_left_collapse': workspace.panelLeft.collapseWidth,
    '--width_panel_right': workspace.panelRight.width,
    '--width_panel_right_collapse': workspace.panelRight.collapseWidth,
    '--gap_content': content.sidebarGap,
  }

  for (const [key, value] of Object.entries(measurements)) {
    if (Array.isArray(value)) {
      let styles = {}
      value.forEach((v, index) => {
        styles[mq[index]] = { [key]: format(v) }
      })
      css = merge(css, styles)
    } else {
      css[key] = format(value)
    }
  }

  /**
   * Handle font family declarations
   */
  for (const [key, value] of Object.entries(fonts)) {
    css[`--fonts-${key}`] = value
  }

  return { html: css }
}
