import { getCssVariables } from '@maker-ui/utils'
import { TabStyles } from './Tabs'

export const cssVariables = (styles?: TabStyles) => {
  return getCssVariables(styles, {
    button: {
      prefix: 'tab-btn',
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
    panel: {
      prefix: 'tab-panel',
      properties: ['bg', 'padding', 'fontSize'],
    },
  })
}
