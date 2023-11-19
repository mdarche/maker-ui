import type { Options } from '@maker-ui/layout-server'
import { formatNumber } from '@maker-ui/utils'

export function getLayoutStyles(
  { topbar, header, content }: Options,
  children: {
    topbar: boolean
    header: boolean
  }
) {
  let styles = ''
  const breakpoint = formatNumber(content.breakpoint)

  /** Sidebar styles */

  const sidebarOrder =
    content?.sidebar === 'right'
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
      : ''

  const width = 'var(--width-sidebar)'
  const sidebarColumns =
    content?.sidebar === 'left' ? `${width} 1fr` : `1fr ${width}`

  styles += `
    ${sidebarOrder}
    .mkui-content-wrapper {
      display: grid;
      grid-template-columns: 1fr;
    }
    @media screen and (min-width: ${breakpoint}) {
      .mkui-content-wrapper {
        grid-template-columns: ${sidebarColumns};
      }
    }
    `

  const getTop = (height = false) => {
    let top = children.header && header.sticky ? 'var(--height-header)' : '0px'
    if (children.topbar && topbar.sticky) {
      top += `${height ? ' -' : ' +'} var(--height-topbar)`
    }
    return top
  }

  /** Workspace styles */
  styles += `
      @media screen and (max-width: ${breakpoint}) { 
        .mkui-btn-ws-left.mobile-hide, .mkui-btn-ws-right.mobile-hide {
          display: none;
        }
      }
      @media screen and (min-width: ${breakpoint}) {
        .mkui-layout-init {
          display: grid;
        }
        .mkui-overlay.panel {
          display: none;
        }
        .mkui-panel.left, .mkui-panel.right {
          position: relative;
          transform: translateX(0);
          width: 100%;
          z-index: 0;
        }
        .mkui-layout.left-content {
          grid-template-columns: var(--width-left-panel-collapse, 0) 1fr;
        }
        .mkui-layout.left-content.left-active {
          grid-template-columns: var(--width-left-panel, var(--width-panel)) 1fr;
        }
        .mkui-layout.content-right {
          grid-template-columns: 1fr var(--width-right-panel-collapse, 0);
        }
        .mkui-layout.content-right.right-active {
          grid-template-columns: 1fr var(--width-right-panel, var(--width-panel));
        }
        .mkui-panel.left .mkui-panel-inner, .mkui-panel.right .mkui-panel-inner {
          top: calc(${getTop()});
          height: calc(100vh - ${getTop(true)});
        }
        .mkui-layout.left-content-right {
          grid-template-columns: var(--width-left-panel-collapse, 0) 1fr var(--width-right-panel-collapse, 0);
        }
        .mkui-layout.left-content-right.left-active {
          grid-template-columns: var(--width-left-panel, var(--width-panel)) 1fr var(--width-right-panel-collapse, 0);
        }
        .mkui-layout.left-content-right.right-active {
          grid-template-columns: var(--width-left-panel-collapse, 0) 1fr var(--width-right-panel, var(--width-panel));
        }
        .mkui-layout.left-content-right.left-active.right-active {
          grid-template-columns: var(--width-left-panel, var(--width-panel)) 1fr var(--width-right-panel, var(--width-panel));
        }
      }
      `

  return styles
}
