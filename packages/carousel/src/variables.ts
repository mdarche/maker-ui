import { cleanObject, formatNumber } from '@maker-ui/utils'
import { CarouselStyles } from './types'

export const cssVariables = (styles?: CarouselStyles) =>
  cleanObject({
    // Overlay
    '--carousel-overlay-bg': styles?.overlay?.background,
    // Arrow
    '--carousel-arrow-fill': styles?.arrow?.fill,
    '--carousel-arrow-height': formatNumber(styles?.arrow?.height),
    '--carousel-arrow-bg': styles?.arrow?.background,
    '--carousel-arrow-border': styles?.arrow?.border,
    // Dots
    '--carousel-dot-bg': styles?.dot?.background,
    '--carousel-dot-bg-active': styles?.dot?.backgroundActive,
    '--carousel-dot-border-radius': formatNumber(styles?.dot?.borderRadius),
    '--carousel-dot-height': formatNumber(styles?.dot?.height),
    '--carousel-dot-width': formatNumber(styles?.dot?.width),
    '--carousel-dot-margin': formatNumber(styles?.dot?.margin),
    '--carousel-dot-padding': formatNumber(styles?.dot?.padding),
  })
