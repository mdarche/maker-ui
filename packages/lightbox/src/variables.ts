import { getCssVariables } from '@maker-ui/utils'
import type { LightboxStyles } from './types'

export const cssVariables = (styles?: LightboxStyles) => {
  return getCssVariables(styles, {
    toolbar: {
      prefix: 'lbx-toolbar',
      properties: ['bg', 'fill', 'padding', 'height', 'bgActive', 'fillActive'],
    },
    arrow: {
      prefix: 'lbx-arrow',
      properties: ['bg', 'bgActive', 'border', 'fill', 'height', 'padding'],
    },
    pagination: {
      prefix: 'lbx-pagination',
      properties: ['color', 'fontSize', 'fontFamily', 'padding'],
    },
    preview: {
      prefix: 'lbx-preview',
      properties: [
        'bg',
        'iconFill',
        'iconHeight',
        'imageHeight',
        'imageWidth',
        'gap',
      ],
    },
  })
}
