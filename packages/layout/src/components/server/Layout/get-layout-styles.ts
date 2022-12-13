import * as React from 'react'
import { Options } from '@/types'

export function getLayoutStyles(options: Options, children: React.ReactNode) {
  let styles = ''
  let hasHeader = false
  let hasTopbar = false
  const layout = options.type
  const isSidebar = layout.includes('sidebar')
  const isSidenav = layout.includes('sidenav')
  const bp = isSidebar ? options.sidebar.breakpoint : options.sideNav.breakpoint
  const breakpoint = typeof bp === 'number' ? `${bp}px` : bp

  React.Children.toArray(children).forEach((child: any) => {
    const type = child.props?.className
    if (type?.includes('mkr_header')) {
      hasHeader = true
    }
    if (type?.includes('mkr_topbar')) {
      hasTopbar = true
    }
  })

  /** Sidebar styles */

  const sidebarOrder =
    options.type === 'sidebar-content'
      ? `
          .mkr_sidebar { 
            grid-row: 2;
          }
          @media screen and (min-width: ${breakpoint}) {
            .mkr_sidebar { 
              grid-row: auto;
            }
          }
          `
      : options.type === 'sidebar-content-sidebar'
      ? `
          .mkr_sidebar:first-of-type { 
            grid-row: 2;
          }
          @media screen and (min-width: ${breakpoint}) {
            .mkr_sidebar { 
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
    .mkr_layout {
      grid-template-columns: 1fr;
    }
    @media screen and (min-width: ${breakpoint}) {
      .mkr_layout {
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
    console.log('has header is', hasHeader)
    let top =
      hasHeader && options.header.sticky ? 'var(--height-header)' : '0px'
    if (hasTopbar && options.topbar.sticky) {
      top += `${height ? ' -' : ' +'} var(--height-topbar)`
    }
    return top
  }

  const transition = !options.sideNav.isHeader
    ? `transition: ${options.sideNav.cssTransition};`
    : ''

  const ml = (val: string) =>
    layout === 'sidenav-content' ? `margin-left: ${val};` : ''
  const mr = (val: string) =>
    layout === 'content-sidenav' ? `margin-right: ${val};` : ''

  if (isSidenav) {
    styles = `
      .mkr_sidenav {
        position: fixed;
        z-index: 101;
        ${transition}
      }
      .mkr_sidenav.hide-sidenav {
        transform: translateX(${direction});
      }
      .mkr_sidenav.collapse-sidenav {
        ${ml('0')}
        ${mr('0')}
      }
      .mkr_overlay_s {
        display: block;
      }
      .mkr_sidenav_inner {
        top: 0px;
        height: 100vh;
      }
      @media screen and (min-width: ${breakpoint}) {
        .mkr_sidenav {
          position: relative;
          z-index: 0;
        }
        .mkr_sidenav.hide-sidenav {
          transform: none;
        }
        .mkr_sidenav.collapse-sidenav {
          ${ml('calc(-1 * var(--width-side-nav))')}
          ${mr('calc(-1 * var(--width-side-nav))')}
        }
        .mkr_sidenav_inner {
          top: calc(${getTop()});
          height: calc(100vh - ${getTop(true)});
        }
        .mkr_overlay_s {
          display: none;
        }
      }
    `
  }

  return styles
}
