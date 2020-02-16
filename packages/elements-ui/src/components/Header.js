import React, { useState } from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import { useScrollPosition } from '../config/scroll-position'
import setBreak from '../config/breakpoint'

import { useTraceUpdate } from '../config/prop-trace'

export const Header = React.forwardRef((props, ref) => {
  const { header } = useOptions()
  const [hideOnScroll, setHideOnScroll] = useState(true)
  const [scrollClass, setScrollClass] = useState(null)

  console.log('Header re-render')
  useTraceUpdate(props)

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
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    }, 450)
  }

  if (header.scroll.toggleClass) {
    const { scrollTop, className } = header.scroll

    useScrollPosition(({ currPos }) => {
      const isActive = Math.abs(currPos.y) > scrollTop ? className : null
      if (isActive !== scrollClass) setScrollClass(isActive)
    }, 0)
  }

  const stickyPartial = () => {
    if (stickyScroll) {
      return {
        position: 'sticky',
        top: 0,
        transform: hideOnScroll ? 'none' : 'translateY(-100%)',
        transition: `transform .3s ${hideOnScroll ? `ease-in` : `ease-out`}`,
      }
    }

    if (sticky) {
      return {
        top: 0,
        position: stickyMobile
          ? 'sticky'
          : setBreak(header.breakIndex, ['initial', 'sticky']),
      }
    }

    if (!sticky && stickyMobile) {
      return {
        top: 0,
        position: setBreak(header.breakIndex, ['sticky', 'initial']),
      }
    }

    return
  }

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
        ...stickyPartial(),
      }}
    />
  )
})
