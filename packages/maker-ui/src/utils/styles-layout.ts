import { format, setBreakpoint } from './helper'
import { LayoutState } from '../context/LayoutContext'

/**
 * Internal Maker UI variants for page content layouts
 *
 * @internal only
 *
 */

const sidebarPartial = (layout: string) =>
  layout === 'sidebar content'
    ? {
        '.sidebar': {
          gridRow: [2, 'auto'],
        },
      }
    : layout === 'sidebar content sidebar'
    ? {
        '.sidebar:first-of-type': {
          gridRow: [2, 'auto'],
        },
      }
    : null

export const getLayoutStyles = (
  layout: string,
  bp: number,
  measurements: LayoutState
) => {
  // Sidebar Layouts
  if (layout && layout.includes('sidebar')) {
    return {
      display: 'grid',
      gridGap: t => t.gap.gap_content,
      maxWidth: 'maxWidth_content',
      mx: 'auto',
      minHeight: '80vh',
      gridTemplateColumns: t => {
        const width = format(t.sizes.width_sidebar)
        const grid =
          layout === 'sidebar content'
            ? `${width} 1fr`
            : layout === 'sidebar content sidebar'
            ? `${width} 1fr ${width}`
            : layout === 'content sidebar'
            ? `1fr ${width}`
            : null

        return setBreakpoint(bp, [`1fr`, grid])
      },
      ...sidebarPartial(layout),
    }
  }

  // SideNav Layouts
  if (layout && layout.includes('sidenav')) {
    return {
      display: 'flex',
      '#content': {
        maxWidth: 'maxWidth_content',
        mx: 'auto',
      },
      '#sidenav': {
        right: layout === 'content sidenav' && 0,
        left: layout === 'sidenav content' && 0,
      },
      '#toggle-sidenav': {
        right: layout === 'sidenav content' && 30,
        left: layout === 'content sidenav' && 30,
      },
    }
  }

  // Workspace Layouts
  if (layout && layout.includes('workspace')) {
    return {
      display: 'flex',
      width: '100%',
      height: `calc(100vh - ${format(
        measurements.height_header + measurements.height_topbar
      )})`,
    }
  }

  // Basic Layouts
  return {
    display: 'block',
    maxWidth: 'maxWidth_content',
    mx: 'auto',
  }
}
