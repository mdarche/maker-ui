import { useOptions } from '../context/OptionContext'
import { useMeasurements } from '../context/LayoutContext'

export function useLayoutStyles(layout: string): object {
  const { measurements } = useMeasurements()
  const { topbar, header, sideNav } = useOptions()

  /**
   * -------- Sidebar Styles --------
   */
  if (layout && layout.includes('sidebar')) {
    /** Handle row reversal on mobile so main content always appears first */
    const sidebarOrder = (): object | null => {
      if (layout === 'sidebar content') {
        return {
          '.sidebar': { gridRow: [2, 'auto'] },
        }
      }
      if (layout === 'sidebar content sidebar') {
        return {
          '.sidebar:first-of-type': {
            gridRow: [2, 'auto'],
          },
        }
      }
      return null
    }

    /**
     * Set grid column widths
     */
    const getSidebarColumns = (): string | null => {
      const w1 = 'var(--width_sidebar)'
      const w2 = 'var(--width_second_sidebar)'
      const grid =
        layout === 'sidebar content'
          ? `${w1} 1fr`
          : layout === 'sidebar content sidebar'
          ? `${w1} 1fr ${w2}`
          : layout === 'content sidebar'
          ? `1fr ${w1}`
          : null

      return grid
    }

    return {
      display: 'grid',
      gap: 'var(--gap_content)',
      maxWidth: 'var(--maxWidth_content)',
      margin: '0 auto',
      minHeight: '80vh',
      ...sidebarOrder(),
      gridTemplateColumns: ['1fr', getSidebarColumns()],
    }
  }

  /**
   * -------- SideNav Styles --------
   */
  if (layout && layout.includes('sidenav')) {
    /** Determine the top value for `sidenav content` and `content sidenav` layouts */
    const calculateTop = () => {
      let top = header.sticky ? measurements.height_header : 0

      if (topbar.sticky) {
        top += measurements.height_topbar
      }

      return top
    }

    /**
     * Determine the transform direction for toggling on mobile
     */
    const direction =
      layout === 'sidenav content'
        ? 'calc(-1 * var(--width_sideNav))'
        : 'var(--width_sideNav)'

    /**
     * Check for measurements to complete before adding transition style
     *
     * @todo Find a mobile `sidenav-content` solution for when <Header> does not exist
     *
     */
    const getTransition = () => {
      if (!sideNav.isHeader) {
        return measurements.height_header !== 0 ? sideNav.cssTransition : null
      }
      return sideNav.cssTransition
    }

    return {
      display: 'flex',
      '#sidenav': {
        position: ['fixed', 'relative'],
        zIndex: [101, 0],
        top: 0,
        bottom: 0,
        width: 'var(--width_sideNav)',
        right: layout === 'content sidenav' && 0,
        left: layout === 'sidenav content' && 0,
        willChange: 'transform',
        transform: 'translateX(0)',
        transition: getTransition(),
        '&.hide-sidenav': {
          transform: [`translateX(${direction})`, 'none'],
        },
        '&.collapse-sidenav': {
          marginLeft:
            layout === 'sidenav content'
              ? [0, 'calc(-1 * var(--width_sideNav))']
              : undefined,
          marginRight:
            layout === 'content sidenav'
              ? [0, 'calc(-1 * var(--width_sideNav))']
              : undefined,
        },
        '> .container': {
          position: 'sticky',
          top: [0, calculateTop()],
          height: ['100vh', `calc(100vh - ${calculateTop()}px)`],
          overflowY: 'auto',
        },
      },
      '#content': {
        maxWidth: 'var(--maxWidth_content)',
      },
      '#toggle-sidenav': {
        right: layout === 'sidenav content' ? 30 : undefined,
        left: layout === 'content sidenav' ? 30 : undefined,
      },
      '#collapse-sidenav': {
        top: 80,
        height: 50,
        right: layout === 'sidenav content' ? -40 : undefined,
        left: layout === 'content sidenav' ? -40 : undefined,
      },
      '.default-collapse': {
        height: 24,
        transform: layout === 'content sidenav' ? 'rotate(180deg)' : undefined,
        '&.rotate': {
          transform:
            layout === 'sidenav content' ? 'rotate(180deg)' : undefined,
        },
      },
    }
  }

  /**
   * -------- Content Styles (default) --------
   */
  return {
    display: 'block',
    maxWidth: 'var(--maxWidth_content)',
    margin: '0 auto',
  }
}
