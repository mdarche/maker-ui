import type { ResponsiveCSS } from '@maker-ui/style'

export const css: ResponsiveCSS = {
  position: 'relative',
  width: '100%',
  '.mkui_slider': {
    // cursor: 'pointer',
    overflow: 'hidden',
    width: '100%',
  },
  '.mkui_slide_track': {
    height: '100%',
    display: 'flex',
  },
  '.mkui_slide': {},
  '.mkui_carousel_nav': {},
  '.mkui_carousel_page': {},
  '.mkui_carousel_arrow': {
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
