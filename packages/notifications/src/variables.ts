import { cleanObject, formatNumber } from '@maker-ui/utils'
import type { ToastStyles } from './types'

export const cssVariables = (styles?: ToastStyles) =>
  cleanObject({
    // Container
    '--toast-container-padding': formatNumber(styles?.padding),
    '--toast-distance': formatNumber(styles?.distance),
    '--toast-duration': formatNumber(styles?.duration),
    '--toast-gap': formatNumber(styles?.gap),
    // Toast
    '--toast-border-radius': formatNumber(styles?.toast?.borderRadius),
    '--toast-box-shadow': styles?.toast?.boxShadow,
    '--toast-color': styles?.toast?.color,
    '--toast-bg': styles?.toast?.background,
    '--toast-padding': formatNumber(styles?.toast?.padding),
    '--toast-font-size': formatNumber(styles?.toast?.fontSize),
    // Icon
    '--toast-icon-height': formatNumber(styles?.icon?.height),
    '--toast-icon-fill': styles?.icon?.fill,
  })
