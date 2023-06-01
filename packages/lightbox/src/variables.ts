import { cleanObject, formatNumber } from '@maker-ui/utils'
import type { LightboxStyles } from './types'

export const cssVariables = (styles?: LightboxStyles) =>
  cleanObject({
    // Toolbar buttons
    '--lightbox-toolbar-bg': styles?.toolbar?.background,
    '--lightbox-toolbar-fill': styles?.toolbar?.fill,
    '--lightbox-toolbar-padding': formatNumber(styles?.toolbar?.padding),
    '--lightbox-toolbar-height': formatNumber(styles?.toolbar?.height),
    '--lightbox-toolbar-bg-active': styles?.toolbar?.backgroundActive,
    '--lightbox-toolbar-fill-active': styles?.toolbar?.fillActive,
    // Arrows
    '--lightbox-arrow-bg': styles?.arrow?.background,
    '--lightbox-arrow-fill': styles?.arrow?.fill,
    '--lightbox-arrow-height': formatNumber(styles?.arrow?.height),
    '--lightbox-arrow-border': styles?.arrow?.border,
    '--lightbox-arrow-padding': formatNumber(styles?.arrow?.padding),
    // Overlay
    '--lightbox-overlay-bg': styles?.overlay?.background,
  })
