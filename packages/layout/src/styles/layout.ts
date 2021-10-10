import { MakerProps } from '@maker-ui/css'

export const layoutStyles: MakerProps['css'] = {
  '.skiplinks': {
    listStyle: 'none',
    position: 'relative',
    zIndex: 1000,
    padding: 0,
    margin: 0,
    a: {
      background: 'var(--color-bg_header)',
      display: 'block',
      position: 'absolute',
      fontFamily: 'var(--font-body)',
      left: -9999,
      padding: '1em',
      '&:focus': {
        left: 0,
      },
    },
  },
  header: {
    zIndex: 100,
  },
  '.submenu-toggle': {
    border: 'none',
    background: 'transparent',
    svg: {
      height: 12,
      width: 12,
      transition: 'transform ease .2s',
      transformOrigin: '50% 55%',
      '&.rotate': {
        transform: 'rotate(180deg)',
      },
    },
  },
  '.menu-overlay': {
    background: 'rgba(0, 0, 0, 0.15)',
    zIndex: 100,
    willChange: 'opacity',
    transition: 'all ease .4s',
    visibility: 'hidden',
    opacity: 0,
    '&.active': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  main: {
    position: 'relative',
    flex: 1,
    margin: '0 auto',
  },
  section: {
    width: '100%',
  },
}
