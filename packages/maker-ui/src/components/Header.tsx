import React, { useState } from 'react'

import { BasicBoxProps } from './props'
import { Box } from './common'
import { useOptions } from '../context/OptionContext'
import { useScrollPosition } from '../utils/scroll-position'
import { setBreakpoint } from '../utils/helper'

interface Props extends BasicBoxProps {
  sticky?: boolean
  stickyMobile?: boolean
  stickyScroll?: boolean
}

export const Header = React.forwardRef<HTMLElement, Props>((props, ref) => {
  const { header } = useOptions()
  const [scrollClass, setScrollClass] = useState(null)
  const [show, setShow] = useState(true)

  const {
    bg = 'bg_header',
    variant = 'header',
    sticky = header.sticky,
    stickyMobile = header.stickyMobile,
    stickyScroll = header.stickyScroll,
    ...rest
  } = props

  if (stickyScroll) {
    useScrollPosition(({ prevPos, currPos }) => {
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
    }, 250)
  }

  if (header.scroll.toggleClass) {
    const { scrollTop, className } = header.scroll

    useScrollPosition(({ currPos }) => {
      const isActive = currPos > scrollTop ? className : null

      if (isActive !== scrollClass) {
        setScrollClass(isActive)
      }
    }, 0)
  }

  const stickyPartial: React.CSSProperties = stickyScroll
    ? {
        position: 'sticky',
        top: 0,
        transform: show ? 'none' : 'translateY(-100%)',
        transition: `transform .3s ${show ? `ease-in` : `ease-out`}`,
      }
    : sticky
    ? {
        top: 0,
        position: stickyMobile
          ? 'sticky'
          : setBreakpoint(header.breakIndex, ['initial', 'sticky']),
      }
    : !sticky && stickyMobile
    ? {
        top: 0,
        position: setBreakpoint(header.breakIndex, ['sticky', 'initial']),
      }
    : { position: 'relative' }

  return (
    <Box
      ref={ref}
      as="header"
      id="site-header"
      className={scrollClass}
      role="banner"
      variant={variant}
      bg={bg}
      {...rest}
      __css={{
        zIndex: 100,
        ...stickyPartial,
      }}
    />
  )
})
