import { getCssVariables } from '@maker-ui/utils'
import { AccordionProps } from './types'

export const cssVariables = (styles?: AccordionProps['styles']) => {
  return getCssVariables(styles, {
    button: {
      prefix: 'accordion-btn',
      properties: [
        'color',
        'bg',
        'border',
        'padding',
        'fontSize',
        'fontFamily',
        'colorActive',
        'bgActive',
        'borderActive',
      ],
    },
    icon: {
      prefix: 'accordion-icon',
      properties: ['height', 'fill', 'fillActive'],
    },
    panel: {
      prefix: 'accordion-panel',
      properties: ['bg', 'padding', 'fontSize'],
    },
  })
}
