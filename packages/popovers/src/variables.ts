import { getCssVariables } from '@maker-ui/utils'
import type { PopoverStyles } from '@/types'

export const cssVariables = (
  styles?: PopoverStyles,
  type?: 'tooltip' | 'dropdown'
) => {
  const root =
    type || styles?.tooltip
      ? 'tooltip'
      : styles?.dropdown
      ? 'dropdown'
      : 'popover'

  return getCssVariables(styles, {
    [root]: {
      prefix: root,
      properties: [
        'bg',
        'border',
        'color',
        'fontSize',
        'fontFamily',
        'padding',
      ],
    },
    button: {
      prefix: `${root}-btn`,
      properties: [
        'bg',
        'border',
        'color',
        'fontSize',
        'fontFamily',
        'padding',
        'bgHover',
        'colorHover',
      ],
    },
  })
}
