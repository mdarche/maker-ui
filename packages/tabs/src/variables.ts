import { cleanObject, formatNumber } from '@maker-ui/utils'
import { TabStyles } from './Tabs'

export const cssVariables = (styles?: TabStyles) =>
  cleanObject({
    // Button Styles
    '--tab-btn-color': styles?.button?.color,
    '--tab-btn-bg': styles?.button?.background,
    '--tab-btn-border': styles?.button?.border,
    '--tab-btn-padding': formatNumber(styles?.button?.padding),
    '--tab-btn-font-size': formatNumber(styles?.button?.fontSize),
    '--tab-btn-font-family': styles?.button?.fontFamily,
    '--tab-btn-color-active': styles?.button?.colorActive,
    '--tab-btn-bg-active': styles?.button?.backgroundActive,
    '--tab-btn-border-active': styles?.button?.borderActive,
    // Panel Styles
    '--tab-panel-bg': styles?.panel?.background,
    '--tab-panel-padding': formatNumber(styles?.panel?.padding),
    '--tab-panel-font-size': formatNumber(styles?.panel?.fontSize),
  })
