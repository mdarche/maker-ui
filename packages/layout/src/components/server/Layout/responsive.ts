import { Options } from '@/types'

function getStyles(
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

  if (isSidenav) {
    styles = `
      .mkui-sn {
        position: fixed;
        z-index: 101;
        transition: ${sideNav.cssTransition};
      }
      .mkui-sn.sn-collapse {
        margin-left: 0;
        margin-right: 0;
      }
      .mkui-sn.sn-hide {
        transform: translateX(${direction});
      }
      .mkui-sn-init {
        display: none;
      }
      @media screen and (min-width: ${breakpoint}) {
        .mkui-sn.mkui-carousel {
          max-width: calc(100vw - var(--width-side-nav)) !important;
        }
        .mkui-sn-init {
          display: flex;
        }
        .mkui-btn-collapse {
          display: none;
        }
        .mkui-btn-collapse.collapsible {
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

  return styles
}

export default getStyles
