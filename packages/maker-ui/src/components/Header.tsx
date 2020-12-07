/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react'

import { MakerProps } from './types'
import { ErrorBoundary } from './ErrorBoundary'
import { useOptions } from '../context/OptionContext'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { setBreakpoint } from '../utils/helper'
import { useMeasure } from '../hooks/useMeasure'
import { useLayout, useMeasurements } from '../context/LayoutContext'

interface HeaderProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  bg?: string | string[]
  sticky?: boolean
  stickyOnMobile?: boolean
  stickyUpScroll?: boolean
}

/**
 * The `Header` component stores your site logo, primary menu, mobile menu,
 * and any necessary navigation elements.
 *
 * @see https://maker-ui.com/docs/layout/header
 */

export const Header = (props: HeaderProps) => {
  const [scrollClass, setScrollClass] = useState('')
  const [initialRender, setInitialRender] = useState(true)
  const [show, setShow] = useState(true)
  const [layout] = useLayout('content')
  const { measurements, setMeasurement } = useMeasurements()
  const { framework, header, topbar } = useOptions()
  const activateScrollClass = header.scrollClass ? true : false

  const [bind, { height }] = useMeasure({
    observe: layout.includes('workspace'),
  })

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('header', height)
    }
  }, [height])

  useEffect(() => {
    setInitialRender(false)
  }, [])

  const {
    variant = 'header',
    bg = 'bg_header',
    background,
    sx,
    sticky = header.sticky,
    stickyOnMobile = header.stickyOnMobile,
    stickyUpScroll = header.stickyUpScroll,
    children,
    ...rest
  } = props

  /**
   * Fire hook effect if stickyUpScroll === true
   */
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isDownScroll = currPos > prevPos
      const aboveLimit = currPos > 500

      if (!aboveLimit && !show) {
        setShow(true)
      }

      if (aboveLimit && isDownScroll && show) {
        setShow(false)
      }

      if (aboveLimit && !isDownScroll && !show) {
        setShow(true)
      }
    },
    350,
    stickyUpScroll
  )

  /**
   * Fire hook effect if header.scroll.toggleClass === true
   */
  useScrollPosition(
    ({ currPos }) => {
      if (activateScrollClass) {
        const { scrollTop, className } = header.scrollClass
        const isActive = currPos > scrollTop ? className : ''

        if (isActive !== scrollClass) {
          setScrollClass(isActive)
        }
      }
    },
    0,
    activateScrollClass
  )

  /**
   * Calculate responsive top value according to topbar.sticky configuration
   */
  const calculateTop = () => {
    if (topbar.sticky && !topbar.stickyOnMobile) {
      return setBreakpoint(header.bpIndex, [0, measurements.height_topbar])
    }

    if (topbar.sticky && topbar.stickyOnMobile) {
      return measurements.height_topbar
    }

    if (!topbar.sticky && topbar.stickyOnMobile) {
      return setBreakpoint(header.bpIndex, [measurements.height_topbar, 0])
    }

    return 0
  }

  /**
   * Calculate responsive header styles for header.sticky configurations
   */

  const stickyPartial = () => {
    if (stickyUpScroll) {
      return {
        position: 'sticky',
        top: calculateTop,
        transition: 'transform .3s ease-in',
        '&.scroll-active': {
          transform: 'translateY(-100%)',
        },
      }
    }

    if (sticky) {
      return {
        top: calculateTop,
        position: stickyOnMobile
          ? 'sticky'
          : setBreakpoint(header.bpIndex, ['initial', 'sticky']),
      }
    }

    if (!sticky && stickyOnMobile) {
      return {
        top: calculateTop,
        position: setBreakpoint(header.bpIndex, ['sticky', 'initial']),
      }
    }

    return { position: 'relative' }
  }

  return (
    <header
      {...bind}
      id="site-header"
      className={`${scrollClass}${
        stickyUpScroll && !show ? ' scroll-active' : ''
      }`}
      role="banner"
      sx={{
        bg,
        background,
        zIndex: 100,
        variant,
        visibility: framework === 'gatsby' && initialRender && ['hidden'],
        ...sx,
        ...stickyPartial(),
      }}
      {...rest}>
      <ErrorBoundary errorKey="header">{children}</ErrorBoundary>
    </header>
  )
}

Header.displayName = 'Header'
