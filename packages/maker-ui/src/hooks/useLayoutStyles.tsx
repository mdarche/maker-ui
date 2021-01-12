import merge from 'deepmerge'

import { useOptions } from '../context/OptionContext'
import { useMeasurements, LayoutString } from '../context/LayoutContext'
import { format } from '../utils/helper'
import { useMediaQuery } from './useMediaQuery'

export function useLayoutStyles(layout: LayoutString): object {
  const { measurements } = useMeasurements()
  const { mediaQuery } = useMediaQuery()
  const { topbar, header, sideNav, content, workspace } = useOptions()

  /**
   * -------- Sidebar Styles --------
   */
  if (layout && layout.includes('sidebar')) {
    /**
     * Handle row reversal on mobile so main content always appears first
     */
    const sidebarOrder = (): object | null => {
      if (layout === 'sidebar content') {
        return {
          '.sidebar': mediaQuery('gridRow', [2, 'auto'], content.bpIndex),
        }
      }
      if (layout === 'sidebar content sidebar') {
        return {
          '.sidebar:first-of-type': mediaQuery(
            'gridRow',
            [2, 'auto'],
            content.bpIndex
          ),
        }
      }
      return null
    }

    /**
     * Set grid column widths
     */
    const sidebarColumns = (): object | null => {
      const width = 'var(--width_sidebar)'
      const grid =
        layout === 'sidebar content'
          ? `${width} 1fr`
          : layout === 'sidebar content sidebar'
          ? `${width} 1fr ${width}`
          : layout === 'content sidebar'
          ? `1fr ${width}`
          : null

      return mediaQuery('gridTemplateColumns', [`1fr`, grid], content.bpIndex)
    }

    /**
     * Merge styles that may share the same breakpoints
     */
    const responsiveStyles: object = merge(sidebarOrder(), sidebarColumns())

    return {
      display: 'grid',
      gridGap: 'var(--gap_content)',
      maxWidth: 'var(--maxWidth_content)',
      margin: '0 auto',
      minHeight: '80vh',
      ...responsiveStyles,
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
    const calculateTop = (styleRule?: boolean) => {
      let top = header.sticky ? measurements.height_header : 0

      if (topbar.sticky) {
        top += measurements.height_topbar
      }

      return styleRule ? mediaQuery('top', [0, top], sideNav.bpIndex) : top
    }

    /**
     * Determine the transform direction for toggling on mobile
     */
    const getTransform = width => {
      const w = Array.isArray(width) ? width[sideNav.bpIndex] : width
      const shift = layout === 'sidenav content' ? `-${w}` : w
      return `translateX(${format(shift)})`
    }

    /**
     * Check for measurements to complete before adding transition style
     * @todo Find a mobile `sidenav-content` solution for when <Header> does not exist
     */
    const getTransition = () => {
      if (!sideNav.isHeader) {
        return measurements.height_header !== 0 ? sideNav.easingCurve : null
      }
      return sideNav.easingCurve
    }

    /**
     * Merge styles that may share the same breakpoints
     */
    const responsiveStyles: object = merge(
      mediaQuery('position', ['fixed', 'relative'], sideNav.bpIndex),
      mediaQuery('zIndex', [101, 0], sideNav.bpIndex)
    )

    return {
      display: 'flex',
      '#sidenav': {
        ...responsiveStyles,
        top: 0,
        bottom: 0,
        width: 'var(--width_sideNav)',
        right: layout === 'content sidenav' && 0,
        left: layout === 'sidenav content' && 0,
        willChange: 'transform',
        transform: 'translateX(0)',
        transition: getTransition(),
        '&.hide': {
          ...mediaQuery(
            'transform',
            [getTransform(sideNav.width), 'none'],
            sideNav.bpIndex
          ),
        },
        '> .container': {
          position: 'sticky',
          ...calculateTop(true),
          height: `calc(100vh - ${calculateTop()}px)`,
          overflowY: 'auto',
        },
      },
      '#content': {
        maxWidth: 'var(--maxWidth_content)',
        margin: '0 auto',
      },
      '#toggle-sidenav': {
        right: layout === 'sidenav content' && 30,
        left: layout === 'content sidenav' && 30,
      },
    }
  }

  /**
   * -------- Workspace / Dock Styles --------
   */
  if (layout && layout.includes('workspace')) {
    return {
      display: 'flex',
      '#workspace': { flex: 1 },
      '#dock': {
        width: 'var(--width_dock)',
        ...mediaQuery(
          'display',
          workspace.dock.hideOnMobile ? ['none', 'block'] : ['block'],
          workspace.dock.bpIndex
        ),
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
