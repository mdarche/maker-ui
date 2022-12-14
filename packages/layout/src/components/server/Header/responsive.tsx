import type { Options } from '@/types'

/**
 * Grid & flex justification styles for desktop
 */
const desktop = {
  basic: {
    areas: '"logo menu widgets button"',
    columns: 'auto 1fr auto auto',
    widgetArea: 'flex-start',
  },
  'basic-left': {
    areas: '"logo menu widgets button"',
    columns: 'auto 1fr auto auto',
    widgetArea: 'flex-start',
  },
  'basic-center': {
    areas: '"logo menu widgets button"',
    columns: 'auto 1fr auto auto',
    widgetArea: 'flex-start',
  },
  center: {
    areas: `"logo" "menu"`,
    columns: '1fr',
    widgetArea: 'flex-start',
  },
  split: {
    areas: '"menu-split logo menu widgets button"',
    columns: '1fr auto 1fr auto',
    widgetArea: 'flex-start',
  },
  reverse: {
    areas: '"menu logo widgets button"',
    columns: '1fr auto 1fr auto',
    widgetArea: 'flex-end',
  },
  minimal: {
    areas: '"logo widgets button"',
    columns: 'auto 1fr auto',
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
    areas: '"logo widgets button"',
    columns: 'auto 1fr auto',
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
function getStyles(
  options: Options,
  children: { topbar: boolean; header: boolean }
) {
  // Helpers
  const layout = options.header.navType
  const mobileLayout = options.header.navTypeMobile
  const bp = options.header.breakpoint
  const breakpoint = typeof bp === 'number' ? `${bp}px` : bp

  return `
    .mkr_header.d-sticky, .mkr_topbar.d-sticky {
      position: relative;
    }
    .mkr_topbar.sticky, .mkr_topbar.m-sticky {
      position: sticky;
    }
    .mkr_header.sticky,
    .mkr_header.m-sticky {
      position: sticky;
      top: ${
        children.topbar &&
        options.topbar.stickyOnMobile &&
        !options.topbar.hideOnMobile
          ? 'var(--height-topbar)'
          : '0px'
      };
    }
    .mkr_nav .menu-slot {
      display: none;
    }
    .mkr_nav .button-slot {
      display: flex;
    }
    .mkr_nav {
      grid-template-areas: ${mobile[mobileLayout].areas};
      grid-template-columns: ${mobile[mobileLayout].columns};
    }
    .mkr_nav .widget-slot {
      justify-content: ${mobile[mobileLayout].widgetArea};
    }
    @media screen and (min-width: ${breakpoint}) {
      .mkr_header.sticky {
        top: ${
          children.topbar && options.topbar.sticky
            ? 'var(--height-topbar)'
            : '0px'
        };
      }
      .mkr_header.d-sticky.abs,
      .mkr_header.m-sticky, .mkr_topbar.m-sticky {
        position: relative;
      }
      .mkr_topbar.d-sticky {
        position: sticky;
      }
      .mkr_header.d-sticky {
        position: sticky;
        top: ${
          children.topbar && options.topbar.sticky
            ? 'var(--height-topbar)'
            : '0px'
        };
      }
      .mkr_topbar.m-hide {
        display: block;
      }
      .mkr_nav { 
        grid-template-areas: ${desktop[layout].areas};
        grid-template-columns: ${desktop[layout].columns};
        grid-template-rows: ${layout !== 'center' ? '1fr' : '1fr 1fr'};
      }
      .mkr_nav .widget-slot {
        justify-content: ${desktop[layout].widgetArea};
      }
      .mkr_nav .menu-slot {
        display: ${layout.includes('minimal') ? 'none' : 'flex'};
      }
      .mkr_nav .button-slot {
        display: ${
          layout.includes('minimal') || options.mobileMenu.visibleOnDesktop
            ? 'flex'
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
export default getStyles
