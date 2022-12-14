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
          .mkui_sidebar { 
            grid-row: 2;
          }
          @media screen and (min-width: ${breakpoint}) {
            .mkui_sidebar { 
              grid-row: auto;
            }
          }
          `
      : layout === 'sidebar-content-sidebar'
      ? `
          .mkui_sidebar:first-of-type { 
            grid-row: 2;
          }
          @media screen and (min-width: ${breakpoint}) {
            .mkui_sidebar { 
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
    .mkui_layout {
      grid-template-columns: 1fr;
    }
    @media screen and (min-width: ${breakpoint}) {
      .mkui_layout {
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
      .mkui_sn {
        position: fixed;
        z-index: 101;
        transition: ${sideNav.cssTransition};
      }
      .mkui_sn.sn-collapse {
        margin-left: 0;
        margin-right: 0;
      }
      .mkui_sn.sn-hide {
        transform: translateX(${direction});
      }
      @media screen and (min-width: ${breakpoint}) {
        .mkui_btn_collapse {
          display: none;
        }
        .mkui_btn_collapse.collapsible {
          display: block;
        }
        .mkui_sn {
          position: relative;
          z-index: 0;
        }
        .mkui_sn.sn-hide {
          transform: none;
        }
        .mkui_sn.sn-collapse {
          ${ml('calc(-1 * var(--width-side-nav))')}
          ${mr('calc(-1 * var(--width-side-nav))')}
        }
        .mkui_sn_inner {
          top: calc(${getTop()});
          height: calc(100vh - ${getTop(true)});
        }
        .mkui_overlay_s {
          display: none;
        }
      }
    `
  }

  return styles
}

export default getStyles
