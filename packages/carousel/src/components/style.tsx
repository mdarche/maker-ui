import type { ResponsiveCSS } from '@maker-ui/style'

export const css: ResponsiveCSS = {
  position: 'relative',
  width: '100%',
  margin: 'auto',
  maxWidth: '100vw',
  outline: 'none',
  '.mkui-slider': {
    // cursor: 'pointer',
    overflow: 'hidden',
    width: '100%',
  },
  '.mkui-slide-track': {
    height: '100%',
    display: 'flex',
  },
  '.mkui-slide': {
    height: '100%',
  },
  '.mkui-carousel-nav': {},
  '.mkui-carousel-page': {},
  '.mkui-carousel-arrow': {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    position: 'absolute',
    top: '50%',
    // padding,
    // margin,
    zIndex: 1,
    '.default-arrow': {
      height: 30,
    },
    '&.right': {
      right: 0,
      '.default-arrow': {
        transform: 'translateY(-50%)',
      },
    },
    '&.left': {
      left: 0,
      '.default-arrow': {
        transform: 'translateY(-50%) scaleX(-1)',
      },
    },
  },
}
