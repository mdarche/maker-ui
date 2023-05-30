import { cleanObject, formatNumber } from '@maker-ui/utils'
import { AccordionProps } from './types'

export const cssVariables = (styles?: AccordionProps['styles']) =>
  cleanObject({
    // Button Styles
    '--accordion-btn-color': styles?.button?.color,
    '--accordion-btn-bg': styles?.button?.background,
    '--accordion-btn-border': styles?.button?.border,
    '--accordion-btn-padding': formatNumber(styles?.button?.padding),
    '--accordion-btn-font-size': formatNumber(styles?.button?.fontSize),
    '--accordion-btn-font-family': styles?.button?.fontFamily,
    '--accordion-btn-color-active': styles?.button?.colorActive,
    '--accordion-btn-bg-active': styles?.button?.backgroundActive,
    '--accordion-btn-border-active': styles?.button?.borderActive,
    '--accordion-icon-fill': styles?.icon?.fill,
    '--accordion-icon-fill-active': styles?.icon?.fillActive,
    '--accordion-icon-height': formatNumber(styles?.icon?.height),
    // Panel Styles
    '--accordion-panel-bg': styles?.panel?.background,
    '--accordion-panel-padding': formatNumber(styles?.panel?.padding),
    '--accordion-panel-font-size': formatNumber(styles?.panel?.fontSize),
  })
