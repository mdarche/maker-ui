import { getCssVariables } from '@maker-ui/utils'
import type { ToastStyles } from './types'

export const cssVariables = (styles?: ToastStyles) => {
  return getCssVariables(styles, {
    container: {
      prefix: 'toast-container',
      properties: ['padding', 'gap'],
    },
    toast: {
      prefix: 'toast',
      properties: [
        'border',
        'borderRadius',
        'boxShadow',
        'color',
        'background',
        'padding',
        'fontSize',
        'distance',
        'duration',
      ],
    },
    icon: {
      prefix: 'toast-icon',
      properties: ['height', 'fill'],
    },
  })
}
