import { getCssVariables } from '@maker-ui/utils'
import { CarouselStyles } from './types'

export const cssVariables = (styles?: CarouselStyles) => {
  return getCssVariables(styles, {
    overlay: {
      prefix: 'carousel-overlay',
      properties: ['bg'],
    },
    arrow: {
      prefix: 'carousel-arrow',
      properties: ['fill', 'height', 'bg', 'border'],
    },
    dot: {
      prefix: 'carousel-dot',
      properties: [
        'bg',
        'bgActive',
        'borderRadius',
        'height',
        'width',
        'margin',
        'padding',
      ],
    },
  })
}
