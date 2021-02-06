/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { useEffect, useState } from 'react'

import { ErrorBoundary } from './Errors'
import { useOptions } from '../context/OptionContext'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useMeasure } from '../hooks/useMeasure'
import { useLayout, useMeasurements } from '../context/LayoutContext'
import { setBreakpoint, setClassName } from '../utils/helper'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>, MakerProps {
  absolute?: boolean
  background?: string | string[]
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
  const { framework, header, topbar, breakpoints } = useOptions()
  const activateScrollClass = header.scrollClass ? true : false

  const [bind, { height }] = useMeasure({
    observe: layout.includes('workspace'),
  })

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('header', height)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  useEffect(() => {
    setInitialRender(false)
  }, [])

  const {
    absolute = header.absolute,
    background = 'var(--color-bg_header)',
    sticky = header.sticky,
    stickyOnMobile = header.stickyOnMobile,
    stickyUpScroll = header.stickyUpScroll,
    className,
    css,
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
   * Fire hook effect if header.scrollClass !== undefined
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
      return [0, measurements.height_topbar]
    }

    if (topbar.sticky && topbar.stickyOnMobile) {
      return measurements.height_topbar
    }

    if (!topbar.sticky && topbar.stickyOnMobile) {
      return [measurements.height_topbar, 0]
    }

    return 0
  }

  /**
   * Calculate responsive header styles for header.sticky configurations
   *
   * @todo - Calculate the correct 'scroll-active' transform so it accounts for the
   * topbar (sticky or static)
   */

  const stickyPos = absolute ? 'fixed' : 'sticky'
  const initialPos = absolute ? 'absolute' : 'initial'

  const stickyPartial = (): object => {
    if (stickyUpScroll) {
      return {
        position: stickyPos,
        top: calculateTop(),
        transition: 'transform .3s ease-in',
        '&.scroll-active': {
          transform: `translateY(-100%)`,
        },
      }
    }

    if (sticky) {
      return {
        top: calculateTop(),
        position: stickyOnMobile ? [stickyPos] : [initialPos, stickyPos],
      }
    }

    if (!sticky && stickyOnMobile) {
      return {
        top: calculateTop(),
        position: [stickyPos, initialPos],
      }
    }

    return { position: initialPos }
  }

  /**
   * Format MakerUI scroll classes to merge with user-generated ones
   */
  let libClasses = [
    scrollClass,
    `${stickyUpScroll && !show ? 'scroll-active' : ''}`,
  ].join(' ')

  return (
    <header
      {...bind}
      className={setClassName(libClasses, className)}
      role="banner"
      breakpoints={setBreakpoint(header.breakpoint, breakpoints)}
      css={{
        background,
        zIndex: 100,
        width: absolute ? '100%' : undefined,
        visibility:
          framework === 'gatsby' && initialRender ? ['hidden'] : undefined,
        ...stickyPartial(),
        ...(css as object),
      }}
      {...rest}>
      <ErrorBoundary errorKey="header">{children}</ErrorBoundary>
    </header>
  )
}

Header.displayName = 'Header'
