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
  const [scrollClass, setScrollClass] = useState(null)
  const [show, setShow] = useState(true)

  const { header } = useOptions()
  const [layout] = useLayout('content')
  const [bind, { height }] = useMeasure(layout.includes('workspace'))
  const { setMeasurement } = useMeasurements()

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('header', height)
    }
  }, [height])

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

  // Fire hook effect if stickyUpScroll === true
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
    250,
    stickyUpScroll
  )

  // Fire hook effect if header.scroll.toggleClass === true
  useScrollPosition(
    ({ currPos }) => {
      const { scrollTop, className } = header.scroll
      const isActive = currPos > scrollTop ? className : null

      if (isActive !== scrollClass) {
        setScrollClass(isActive)
      }
    },
    0,
    header.scroll.toggleClass
  )

  const stickyPartial = stickyUpScroll
    ? {
        position: 'sticky',
        top: 0,
        transform: show ? 'none' : 'translateY(-100%)',
        transition: `transform .3s ${show ? `ease-in` : `ease-out`}`,
      }
    : sticky
    ? {
        top: 0,
        position: stickyOnMobile
          ? 'sticky'
          : setBreakpoint(header.breakIndex, ['initial', 'sticky']),
      }
    : !sticky && stickyOnMobile
    ? {
        top: 0,
        position: setBreakpoint(header.breakIndex, ['sticky', 'initial']),
      }
    : { position: 'relative' }

  return (
    <header
      {...bind}
      id="site-header"
      className={scrollClass}
      role="banner"
      sx={{
        bg,
        background,
        zIndex: 100,
        ...stickyPartial,
        variant,
        ...sx,
      }}
      {...rest}>
      <ErrorBoundary errorKey="header">{children}</ErrorBoundary>
    </header>
  )
}

Header.displayName = 'Header'
