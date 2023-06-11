import { cleanObject, formatNumber } from '@maker-ui/utils'
import type { PopoverStyles } from '@/types'

export const cssVariables = (
  styles?: PopoverStyles,
  type?: 'tooltip' | 'dropdown'
) => {
  const popover = styles?.tooltip || styles?.dropdown || styles?.popover
  const button = styles?.button
  const root =
    type || styles?.tooltip
      ? 'tooltip'
      : styles?.dropdown
      ? 'dropdown'
      : 'popover'

  return cleanObject({
    // Popover, Tooltip, Dropdown
    [`--${root}-bg`]: popover?.background,
    [`--${root}-border`]: popover?.border,
    [`--${root}-color`]: popover?.color,
    [`--${root}-font-size`]: formatNumber(popover?.fontSize),
    [`--${root}-font-family`]: popover?.fontFamily,
    [`--${root}-padding`]: formatNumber(popover?.padding),
    // Trigger button for tooltip and dropdown
    [`--${root}-btn-border`]: button?.border,
    [`--${root}-btn-bg`]: button?.background,
    [`--${root}-btn-padding`]: formatNumber(button?.padding),
    [`--${root}-btn-color`]: button?.color,
    [`--${root}-btn-font-size`]: formatNumber(button?.fontSize),
    [`--${root}-btn-font-family`]: button?.fontFamily,
    [`--${root}-btn-bg-hover`]: button?.backgroundHover,
    [`--${root}-btn-color-hover`]: button?.colorHover,
  })
}
