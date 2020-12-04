import { useOptions } from '../context/OptionContext'
import { useMeasurements, LayoutString } from '../context/LayoutContext'
import { format, setBreakpoint } from '../utils/helper'

export function useLayoutStyles(layout: LayoutString): object {
  const { measurements } = useMeasurements()
  const { topbar, header, sideNav, content } = useOptions()

  /**
   * @SidebarStyles
   * -- Determine CSS grid configuration
   *
   */
  if (layout && layout.includes('sidebar')) {
    // Handle row reversal on mobile so main content always appears first
    const sidebarPartial =
      layout === 'sidebar content'
        ? {
            '.sidebar': {
              gridRow: setBreakpoint(content.bpIndex, [2, 'auto']),
            },
          }
        : layout === 'sidebar content sidebar'
        ? {
            '.sidebar:first-of-type': {
              gridRow: setBreakpoint(content.bpIndex, [2, 'auto']),
            },
          }
        : null

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

        return setBreakpoint(content.bpIndex, [`1fr`, grid])
      },
      ...sidebarPartial,
    }
  }

  /**
   * @SideNavStyles
   * Determine sticky sideNav configuration
   *
   */
  if (layout && layout.includes('sidenav')) {
    const calculateTop = () => {
      let top = header.sticky ? measurements.height_header : 0

      if (topbar.sticky) {
        top += measurements.height_topbar
      }

      return setBreakpoint(sideNav.bpIndex, [0, top])
    }

    const getTransform = width => {
      const w = Array.isArray(width) ? width[sideNav.bpIndex] : width
      const shift = layout === 'sidenav content' ? `-${w}` : w
      return `translateX(${format(shift)})`
    }

    return {
      display: 'flex',
      '#sidenav': {
        position: setBreakpoint(sideNav.bpIndex, ['fixed', 'relative']),
        top: 0,
        bottom: 0,
        zIndex: setBreakpoint(sideNav.bpIndex, [101, 0]),
        width: t => t.sizes.width_sideNav,
        right: layout === 'content sidenav' && 0,
        left: layout === 'sidenav content' && 0,
        willChange: 'transform',
        transform: 'translateX(0)',
        transition: sideNav.easingCurve,
        '&.hide': {
          transform: t =>
            setBreakpoint(sideNav.bpIndex, [
              getTransform(t.sizes.width_sideNav),
              'none',
            ]),
        },
        '> .container': {
          position: 'sticky',
          top: calculateTop,
          height: `calc(100vh - ${calculateTop}px)`,
          overflowY: 'auto',
        },
      },
      '#content': {
        maxWidth: 'maxWidth_content',
        mx: 'auto',
      },
      '#toggle-sidenav': {
        right: layout === 'sidenav content' && 30,
        left: layout === 'content sidenav' && 30,
      },
    }
  }

  /**
   * @WorkspaceStyles
   * Determine sticky sideNav configuration
   *
   */
  if (layout && layout.includes('workspace')) {
    return {
      display: 'flex',
      width: '100%',
      height: `calc(100vh - ${format(
        measurements.height_header + measurements.height_topbar
      )})`,
    }
  }

  /**
   * @Content
   * Default configuration for `content` layout
   *
   */
  return {
    display: 'block',
    maxWidth: 'maxWidth_content',
    mx: 'auto',
  }
}
