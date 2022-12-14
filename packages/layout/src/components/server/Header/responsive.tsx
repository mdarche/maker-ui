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
    .mkui_header.d-sticky, .mkui_topbar.d-sticky {
      position: relative;
    }
    .mkui_topbar.sticky, .mkui_topbar.m-sticky {
      position: sticky;
    }
    .mkui_header.sticky,
    .mkui_header.m-sticky {
      position: sticky;
      top: ${
        children.topbar &&
        options.topbar.stickyOnMobile &&
        !options.topbar.hideOnMobile
          ? 'var(--height-topbar)'
          : '0px'
      };
    }
    .mkui_nav .menu-slot {
      display: none;
    }
    .mkui_nav .button-slot {
      display: flex;
    }
    .mkui_nav {
      grid-template-areas: ${mobile[mobileLayout].areas};
      grid-template-columns: ${mobile[mobileLayout].columns};
    }
    .mkui_nav .widget-slot {
      justify-content: ${mobile[mobileLayout].widgetArea};
    }
    @media screen and (min-width: ${breakpoint}) {
      .mkui_header.sticky {
        top: ${
          children.topbar && options.topbar.sticky
            ? 'var(--height-topbar)'
            : '0px'
        };
      }
      .mkui_header.d-sticky.abs,
      .mkui_header.m-sticky, .mkui_topbar.m-sticky {
        position: relative;
      }
      .mkui_topbar.d-sticky {
        position: sticky;
      }
      .mkui_header.d-sticky {
        position: sticky;
        top: ${
          children.topbar && options.topbar.sticky
            ? 'var(--height-topbar)'
            : '0px'
        };
      }
      .mkui_topbar.m-hide {
        display: block;
      }
      .mkui_nav { 
        grid-template-areas: ${desktop[layout].areas};
        grid-template-columns: ${desktop[layout].columns};
        grid-template-rows: ${layout !== 'center' ? '1fr' : '1fr 1fr'};
      }
      .mkui_nav .widget-slot {
        justify-content: ${desktop[layout].widgetArea};
      }
      .mkui_nav .menu-slot {
        display: ${layout.includes('minimal') ? 'none' : 'flex'};
      }
      .mkui_nav .button-slot {
        display: ${
          layout.includes('minimal') || options.mobileMenu.visibleOnDesktop
            ? 'flex'
            : 'none'
        };
      }
      .mkui_nav.split .widget-slot,
      .mkui_nav.center .widget-slot {
        position: absolute;
      }
      .mkui_nav.minimal-left.m-basic .button-slot {
        display: flex;
      }
      .mkui_nav.minimal.m-logo-center-alt .button-slot,
      .mkui_nav.minimal.m-basic-menu-left .button-slot {
        display: none;
      }
      .mkui_nav.m-logo-center-alt .button-slot {
        justifycontent: flex-start;
      }
    }
  `
}
export default getStyles
