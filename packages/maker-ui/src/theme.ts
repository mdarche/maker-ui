import merge from 'deepmerge'
import { Theme } from 'theme-ui'

import { validate } from './utils/helper'
import { defaultOptions } from './options'

export const createTheme = (theme, options): Theme => {
  const o =
    options === undefined ? defaultOptions : merge(defaultOptions, options)

  const mappedOptions: object = {
    colors: {
      bg_topbar: '#355cac',
      bg_header: '#000',
      bg_mobileMenu: 'rgba(0, 0, 0, 0.9)',
      bg_sideNav: '#333',
      bg_footer: '#fff',
      bg_panel: '#d3d3d3',
    },
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    breakpoints: ['750px', '960px', '1240px'],
    sizes: {
      height_workspace_toolbar: o.workspace.toolbarHeight,
      maxWidth_header: o.header.maxWidth,
      maxWidth_topbar: o.topbar.maxWidth,
      maxWidth_content: o.content.maxWidth,
      maxWidth_section: o.content.maxWidthSection,
      maxWidth_footer: o.footer.maxWidth,
      maxWidth_workspace: o.workspace.canvasMaxWidth,
      width_mobileMenu: o.mobileMenu.width,
      width_sidebar: o.sidebar.width,
      width_sideNav: o.sideNav.width,
      width_panel_left: o.workspace.panelLeft.width,
      width_panel_left_collapse: o.workspace.panelLeft.collapseWidth,
      width_panel_right: o.workspace.panelRight.width,
      width_panel_right_collapse: o.workspace.panelRight.collapseWidth,
    },
    gap: {
      gap_content: o.content.sidebarGap,
    },
  }

  return merge.all([mappedOptions, validate(theme)], {
    arrayMerge: (_, source, __) => source,
  })
}
