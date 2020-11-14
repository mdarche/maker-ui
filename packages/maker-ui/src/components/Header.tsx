/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, useState } from 'react'

import { MakerProps } from './types'
import { useOptions } from '../context/OptionContext'
import { useScrollPosition } from '../utils/scroll-position'
import { setBreakpoint } from '../utils/helper'

interface HeaderProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  bg?: string | string[]
  sticky?: boolean
  stickyOnMobile?: boolean
  stickyUpScroll?: boolean
}

/**
 * Use the `Header` component to store your site logo, primary menu, mobile menu,
 * and any necessary navigation elements.
 *
 * @see https://maker-ui.com/docs/header
 */

export const Header = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const { header } = useOptions()
  const [scrollClass, setScrollClass] = useState(null)
  const [show, setShow] = useState(true)

  const {
    variant = 'header',
    bg = 'bg_header',
    background,
    sx,
    sticky = header.sticky,
    stickyOnMobile = header.stickyOnMobile,
    stickyUpScroll = header.stickyUpScroll,
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
      ref={ref}
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
      {...rest}
    />
  )
})

Header.displayName = 'Header_MakerUI'
