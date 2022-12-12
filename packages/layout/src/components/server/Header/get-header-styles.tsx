import type { Options } from '@/types'
import { mobileEdge } from './Header'

/**
 * Grid & flex justification styles for desktop
 */
const desktop = {
  basic: {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
  },
  'basic-left': {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
  },
  'basic-center': {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
  },
  center: {
    areas: '"logo logo" "menu widgets"',
    columns: '1fr',
    widgetArea: 'flex-start',
  },
  split: {
    areas: '"menu-split logo menu widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-start',
  },
  reverse: {
    areas: '"menu logo widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-end',
  },
  minimal: {
    areas: '"logo widgets"',
    columns: 'auto 1fr',
    widgetArea: 'flex-end',
  },
  'minimal-left': {
    areas: '"button logo widgets"',
    columns: 'auto auto 1fr',
    widgetArea: 'flex-end',
  },
  'minimal-center': {
    areas: '"button logo widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-end',
  },
}

/**
 * Grid & flex justification styles for mobile
 */
const mobile = {
  basic: {
    areas: '"logo widgets"',
    columns: 'auto 1fr',
    widgetArea: 'flex-end',
  },
  'basic-menu-left': {
    areas: '"button logo widgets"',
    columns: 'auto auto 1fr',
    widgetArea: 'flex-end',
  },
  'logo-center': {
    areas: '"button logo widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-end',
  },
  'logo-center-alt': {
    areas: '"widgets logo button"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-start',
  },
}

/**
 * Determine grid-template-area, grid-template-columns, and positioning
 */
export function getHeaderStyles(options: Options) {
  // Helpers
  const layout = options.header.navType
  const mobileLayout = options.header.mobileNavType
  const bp = options.header.breakpoint
  const breakpoint = typeof bp === 'number' ? `${bp}px` : bp

  return `
    .mkr_nav {
      grid-template-areas: ${mobile[mobileLayout].areas};
      grid-template-columns: ${mobile[mobileLayout].columns};
    }
    .mkr_nav .widget-slot {
      justify-content: ${mobile[mobileLayout].widgetArea};
    }
    .widget-slot .mkr_btn_menu {
      display: ${mobileEdge.includes(mobileLayout) ? 'none' : 'block'};
    }
    @media screen and (min-width: ${breakpoint}) {
      .mkr_topbar.m-hide {
        display: block;
      }
      .mkr_nav { 
        grid-template-areas: ${desktop[layout].areas};
        grid-template-columns: ${desktop[layout].columns};
        grid-template-rows: ${layout !== 'center' ? '1fr' : 'repeat(2, 1fr)'};
      }
      .mkr_nav .widget-slot {
        justify-content: ${desktop[layout].widgetArea};
      }
      .menu-slot {
        display: flex;
      }
      .mkr_nav:not(.desktop-minimal) .button-slot {
        display: none;
      }
      .mkr_nav .mkr_btn_menu {
        display: ${
          layout === 'minimal' || options.mobileMenu.visibleOnDesktop
            ? 'block'
            : 'none'
        };
      }
      .mkr_nav.split .widget-slot,
      .mkr_nav.center .widget-slot {
        position: absolute;
      }
      .mkr_nav.minimal-left.m-basic .button-slot {
        display: flex;
      }
      .mkr_nav.minimal.m-logo-center-alt .button-slot,
      .mkr_nav.minimal.m-basic-menu-left .button-slot {
        display: none;
      }
      .mkr_nav.m-logo-center-alt .button-slot {
        justifycontent: flex-start;
      }
    }
  `
}
