import { cleanObject, formatNumber } from '@maker-ui/utils'
import type { LightboxStyles } from './types'

export const cssVariables = (styles?: LightboxStyles) =>
  cleanObject({
    // Toolbar buttons
    '--lbx-toolbar-bg': styles?.toolbar?.background,
    '--lbx-toolbar-fill': styles?.toolbar?.fill,
    '--lbx-toolbar-padding': formatNumber(styles?.toolbar?.padding),
    '--lbx-toolbar-height': formatNumber(styles?.toolbar?.height),
    '--lbx-toolbar-bg-active': styles?.toolbar?.backgroundActive,
    '--lbx-toolbar-fill-active': styles?.toolbar?.fillActive,
    // Arrows
    '--lbx-arrow-bg': styles?.arrow?.background,
    '--lbx-arrow-bg-active': styles?.arrow?.backgroundActive,
    '--lbx-arrow-border': styles?.arrow?.border,
    '--lbx-arrow-fill': styles?.arrow?.fill,
    '--lbx-arrow-height': formatNumber(styles?.arrow?.height),
    '--lbx-arrow-padding': formatNumber(styles?.arrow?.padding),
    // Pagination
    '--lbx-pagination-color': styles?.pagination?.color,
    '--lbx-pagination-bg': styles?.pagination?.background,
    '--lbx-pagination-font-size': formatNumber(styles?.pagination?.fontSize),
    '--lbx-pagination-font-family': styles?.pagination?.fontFamily,
  })
