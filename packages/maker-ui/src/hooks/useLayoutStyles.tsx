import { useOptions } from '../context/OptionContext'
import { useMeasurements, LayoutString } from '../context/LayoutContext'
import { format, setBreakpoint } from '../utils/helper'

export function useLayoutStyles(layout: LayoutString): object {
  const { measurements } = useMeasurements()
  const { topbar, header, sideNav, content } = useOptions()

  /**
   * -------- Sidebar Styles --------
   */
  if (layout && layout.includes('sidebar')) {
    /**
     * Handle row reversal on mobile so main content always appears first
     *
     */
    const sidebarPartial = (): object | null => {
      if (layout === 'sidebar content') {
        return {
          '.sidebar': {
            gridRow: setBreakpoint(content.bpIndex, [2, 'auto']),
          },
        }
      }
      if (layout === 'sidebar content sidebar') {
        return {
          '.sidebar:first-of-type': {
            gridRow: setBreakpoint(content.bpIndex, [2, 'auto']),
          },
        }
      }
      return null
    }

    return {
      display: 'grid',
      gridGap: t => t.gap.gap_content,
      maxWidth: 'maxWidth_content',
      mx: 'auto',
      minHeight: '80vh',
      ...sidebarPartial(),
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
    }
  }

  /**
   * -------- SideNav Styles --------
   */
  if (layout && layout.includes('sidenav')) {
    /**
     * Determine the top value for `sidenav content` and `content sidenav` layouts
     *
     * @todo connect output type to theme-ui SystemStyleObject
     *
     */
    const calculateTop = (): any => {
      let top = header.sticky ? measurements.height_header : 0

      if (topbar.sticky) {
        top += measurements.height_topbar
      }

      return setBreakpoint(sideNav.bpIndex, [0, top])
    }

    /**
     * Determine the transform direction for toggling on mobile
     *
     */
    const getTransform = width => {
      const w = Array.isArray(width) ? width[sideNav.bpIndex] : width
      const shift = layout === 'sidenav content' ? `-${w}` : w
      return `translateX(${format(shift)})`
    }

    /**
     * Check for measurements to complete before adding transition style
     *
     * @todo Find a mobile `sidenav-content` solution for when <Header> does not exist
     *
     */
    const getTransition = () => {
      if (!sideNav.isHeader) {
        return measurements.height_header !== 0 ? sideNav.easingCurve : null
      }
      return sideNav.easingCurve
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
        transition: getTransition(),
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
   * -------- Workspace Styles --------
   */
  if (layout && layout.includes('workspace')) {
    return {
      display: 'flex',
      width: '100%',
      // height: `calc(100vh - ${format(
      //   measurements.height_header + measurements.height_topbar
      // )})`,
    }
  }

  /**
   * -------- Content Styles (default) --------
   */
  return {
    display: 'block',
    maxWidth: 'maxWidth_content',
    mx: 'auto',
  }
}
