import type { Options } from '@maker-ui/layout-server'

export function getLayoutStyles(
  { layout, topbar, header, content, sideNav }: Options,
  children: { topbar: boolean; header: boolean }
) {
  let styles = ''
  const isSidebar = layout.includes('sidebar')
  const isSidenav = layout.includes('sidenav')
  const bp = isSidebar ? content.breakpoint : sideNav.breakpoint
  const breakpoint = typeof bp === 'number' ? `${bp}px` : bp

  /** Sidebar styles */

  const sidebarOrder =
    layout === 'sidebar-content'
      ? `
          .mkui-sidebar { 
            grid-row: 2;
          }
          @media screen and (min-width: ${breakpoint}) {
            .mkui-sidebar { 
              grid-row: auto;
            }
          }
          `
      : layout === 'sidebar-content-sidebar'
      ? `
          .mkui-sidebar:first-of-type { 
            grid-row: 2;
          }
          @media screen and (min-width: ${breakpoint}) {
            .mkui-sidebar { 
              grid-row: auto;
            }
          }
          `
      : ''

  const w1 = 'var(--width-sidebar)'
  const w2 = 'var(--width-sidebar-secondary)'
  const sidebarColumns =
    layout === 'sidebar-content'
      ? `${w1} 1fr`
      : layout === 'sidebar-content-sidebar'
      ? `${w1} 1fr ${w2}`
      : `1fr ${w1}`

  if (isSidebar) {
    styles = `
    ${sidebarOrder}
    .mkui-layout {
      grid-template-columns: 1fr;
    }
    @media screen and (min-width: ${breakpoint}) {
      .mkui-layout {
        grid-template-columns: ${sidebarColumns};
      }
    }
    `
  }

  /** SideNav styles */

  const direction =
    layout === 'sidenav-content'
      ? 'calc(-1 * var(--width-side-nav))'
      : 'var(--width-side-nav)'

  const getTop = (height = false) => {
    let top = children.header && header.sticky ? 'var(--height-header)' : '0px'
    if (children.topbar && topbar.sticky) {
      top += `${height ? ' -' : ' +'} var(--height-topbar)`
    }
    return top
  }

  const ml = (val: string) =>
    layout === 'sidenav-content' ? `margin-left: ${val};` : ''
  const mr = (val: string) =>
    layout === 'content-sidenav' ? `margin-right: ${val};` : ''
  const bl =
    layout === 'sidenav-content' ? 'border-right: var(--border-side-nav);' : ''
  const br =
    layout === 'content-sidenav' ? 'border-left: var(--border-side-nav);' : ''

  if (isSidenav) {
    styles = `
      .mkui-sn {
        position: fixed;
        z-index: 101;
        transition: ${sideNav.cssTransition};
        ${bl}
        ${br}
      }
      .mkui-sn.sn-collapse {
        margin-left: 0;
        margin-right: 0;
      }
      .mkui-btn-side-nav.mobile-hide {
        display: none;
      }
      .mkui-sn.sn-hide {
        transform: translateX(${direction});
      }
      @media screen and (min-width: ${breakpoint}) {
        .l-sn .mkui-carousel {
          max-width: calc(100vw - var(--width-side-nav));
        }
        .l-sn:has(.sn-collapse) .mkui-carousel {
          max-width: 100vw;
        }
        .mkui-layout-init {
          display: flex;
        }
        .mkui-btn-side-nav {
          display: none;
        }
        .mkui-btn-side-nav.desktop {
          display: block;
        }
        .mkui-sn {
          position: relative;
          z-index: 0;
        }
        .mkui-sn.sn-hide {
          transform: none;
        }
        .mkui-sn.sn-collapse {
          ${ml('calc(-1 * var(--width-side-nav))')}
          ${mr('calc(-1 * var(--width-side-nav))')}
        }
        .mkui-sn-inner {
          top: calc(${getTop()});
          height: calc(100vh - ${getTop(true)});
        }
        .mkui-overlay-s {
          display: none;
        }
      }
    `
  }

  /** Workspace styles */
  if (layout === 'workspace') {
    styles = `
      @media screen and (max-width: ${breakpoint}) { 
        .mkui-btn-ws-left.mobile-hide, .mkui-btn-ws-right.mobile-hide {
          display: none;
        }
      }
      @media screen and (min-width: ${breakpoint}) {
        .mkui-layout-init {
          display: grid;
        }
        .mkui-panel-left, .mkui-panel-right {
          position: relative;
          transform: translateX(0);
          width: 100%;
          z-index: 0;
        }
        .mkui-panel-left .mkui-panel-inner, .mkui-panel-right .mkui-panel-inner {
          top: calc(${getTop()});
          height: calc(100vh - ${getTop(true)});
        }
        .mkui-workspace {
          grid-template-columns: var(--width-left-panel-collapse, 0) 1fr var(--width-right-panel-collapse, 0);
        }
        .mkui-workspace.ws-left-active {
          grid-template-columns: var(--width-left-panel, var(--width-panel)) 1fr var(--width-right-panel-collapse, 0);
        }
        .mkui-workspace.ws-right-active {
          grid-template-columns: var(--width-left-panel-collapse, 0) 1fr var(--width-right-panel, var(--width-panel));
        }
        .mkui-workspace.ws-left-active.ws-right-active {
          grid-template-columns: var(--width-left-panel, var(--width-panel)) 1fr var(--width-right-panel, var(--width-panel));
        }
        .mkui-overlay-w {
          display: none;
        }
      }
      `
  }

  return styles
}
