/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useEffect, useState } from 'react'

import { MakerProps } from '../types'
import { ErrorBoundary } from './Errors'
import { useOptions } from '../context/OptionContext'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useMeasure } from '../hooks/useMeasure'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useLayout, useMeasurements } from '../context/LayoutContext'

interface HeaderProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
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
  const { framework, header, topbar } = useOptions()
  const { mediaQuery } = useMediaQuery('header')
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
    background = 'var(--color-bg_header)',
    sx,
    sticky = header.sticky,
    stickyOnMobile = header.stickyOnMobile,
    stickyUpScroll = header.stickyUpScroll,
    children,
    css,
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
      return { ...mediaQuery('top', [0, measurements.height_topbar]) }
    }

    if (topbar.sticky && topbar.stickyOnMobile) {
      return { top: measurements.height_topbar }
    }

    if (!topbar.sticky && topbar.stickyOnMobile) {
      return { ...mediaQuery('top', [measurements.height_topbar, 0]) }
    }

    return { top: 0 }
  }

  /**
   * Calculate responsive header styles for header.sticky configurations
   */

  const stickyPartial = () => {
    if (stickyUpScroll) {
      return {
        position: 'sticky',
        ...calculateTop(),
        transition: 'transform .3s ease-in',
        '&.scroll-active': {
          transform: 'translateY(-100%)',
        },
      }
    }

    if (sticky) {
      return {
        ...calculateTop(),
        ...mediaQuery(
          'position',
          stickyOnMobile ? ['sticky'] : ['initial', 'sticky']
        ),
      }
    }

    if (!sticky && stickyOnMobile) {
      return {
        ...calculateTop(),
        ...mediaQuery('position', ['sticky', 'initial']),
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
      css={{
        background,
        zIndex: 100,
        visibility: framework === 'gatsby' && initialRender && ['hidden'],
        ...(stickyPartial() as object),
        ...(css as object),
      }}
      {...rest}>
      <ErrorBoundary errorKey="header">{children}</ErrorBoundary>
    </header>
  )
}

Header.displayName = 'Header'
