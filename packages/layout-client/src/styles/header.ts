import type { Options } from '@maker-ui/layout-server'

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
export function getHeaderStyles(
  options: Options,
  children: { topbar: boolean; header: boolean }
) {
  // Helpers
  const layout = options.header.navType
  const mobileLayout = options.header.navTypeMobile
  const bp = options.header.breakpoint
  const breakpoint = typeof bp === 'number' ? `${bp}px` : bp

  return `
    .mkui-header.d-sticky, .mkui-topbar.d-sticky {
      position: relative;
    }
    .mkui-header.d-sticky.abs {
      position: absolute;
    }
    .mkui-topbar.sticky, .mkui-topbar.m-sticky {
      position: sticky;
    }
    .mkui-header.sticky.abs, .mkui-header.m-sticky.abs {
      position: fixed;
    }
    .mkui-header.sticky,
    .mkui-header.m-sticky {
      position: sticky;
      top: ${
        children.topbar &&
        options.topbar.stickyOnMobile &&
        !options.topbar.hideOnMobile
          ? 'var(--height-topbar)'
          : '0px'
      };
    }
    .mkui-header.abs.sticky {
      position: fixed;
    }
    .mkui-nav .menu-slot {
      display: none;
    }
    .mkui-nav .button-slot {
      display: flex;
    }
    .mkui-nav {
      grid-template-areas: ${mobile[mobileLayout].areas};
      grid-template-columns: ${mobile[mobileLayout].columns};
    }
    .mkui-nav .widget-slot {
      justify-content: ${mobile[mobileLayout].widgetArea};
    }
    @media screen and (min-width: ${breakpoint}) {
      .mkui-header.sticky {
        top: ${
          children.topbar && options.topbar.sticky
            ? 'var(--height-topbar)'
            : '0px'
        };
      }
      .mkui-header.m-sticky.abs, .mkui-topbar.m-sticky.abs {
        position: absolute;
      }
      .mkui-header.m-sticky, .mkui-topbar.m-sticky {
        position: relative;
      }
      .mkui-topbar.d-sticky {
        position: sticky;
      }
      .mkui-header.d-sticky {
        position: sticky;
        top: ${
          children.topbar && options.topbar.sticky
            ? 'var(--height-topbar)'
            : '0px'
        };
      }
      .mkui-topbar.mobile-hide {
        display: block;
      }
      .mkui-nav { 
        grid-template-areas: ${desktop[layout].areas};
        grid-template-columns: ${desktop[layout].columns};
        grid-template-rows: ${layout !== 'center' ? '1fr' : '1fr 1fr'};
      }
      .mkui-nav .widget-slot {
        justify-content: ${desktop[layout].widgetArea};
      }
      .mkui-nav .menu-slot {
        display: ${layout.includes('minimal') ? 'none' : 'flex'};
      }
      .mkui-nav .button-slot {
        display: ${
          layout.includes('minimal') || options.mobileMenu.visibleOnDesktop
            ? 'flex'
            : 'none'
        };
      }
      .mkui-nav.split .widget-slot,
      .mkui-nav.center .widget-slot {
        position: absolute;
      }
      .mkui-nav.minimal-left.m-basic .button-slot {
        display: flex;
      }
      .mkui-nav.minimal.m-logo-center-alt .button-slot,
      .mkui-nav.minimal.m-basic-menu-left .button-slot {
        display: none;
      }
      .mkui-nav.m-logo-center-alt .button-slot {
        justifycontent: flex-start;
      }
    }
  `
}
