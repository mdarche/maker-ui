import React, { useState } from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import { useScrollPosition } from '../config/scroll-position'
import setBreak from '../config/breakpoint'

export const Header = React.forwardRef((props, ref) => {
  const { header } = useOptions()
  const [hideOnScroll, setHideOnScroll] = useState(true)

  const {
    bg = 'bg_header',
    variant = 'header',
    sticky = header.sticky,
    stickyMobile = header.stickyMobile,
    ...rest
  } = props

  const partial = sticky
    ? {
        position: stickyMobile
          ? 'sticky'
          : setBreak(header.breakIndex, ['initial', 'sticky']),
        top: 0,
      }
    : null

  if (header.stickyScroll) {
    useScrollPosition(({ prevPos, currPos }) => {
      console.log(currPos.y)
    })
  }

  console.log('re-rendering')

  return (
    <Box
      ref={ref}
      as="header"
      id="site-header"
      role="banner"
      variant={variant}
      bg={bg}
      {...rest}
      __css={{
        zIndex: 100,
        ...partial,
      }}
    />
  )
})
