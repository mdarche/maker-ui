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
    '--lbx-pagination-font-size': formatNumber(styles?.pagination?.fontSize),
    '--lbx-pagination-font-family': styles?.pagination?.fontFamily,
    '--lbx-pagination-padding': formatNumber(styles?.pagination?.padding),
    // Preview
    '--lbx-preview-bg': styles?.preview?.background,
    '--lbx-preview-fill': styles?.preview?.iconFill,
    '--lbx-preview-icon-height': formatNumber(styles?.preview?.iconHeight),
    '--lbx-preview-image-height': formatNumber(styles?.preview?.imageHeight),
    '--lbx-preview-image-width': formatNumber(styles?.preview?.imageWidth),
    '--lbx-preview-gap': formatNumber(styles?.preview?.gap),
  })
