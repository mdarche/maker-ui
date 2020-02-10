import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'

// TODO - Hide / show on scroll

export const Header = React.forwardRef((props, ref) => {
  const { header } = useOptions()

  const {
    bg = 'bg_header',
    variant = 'header',
    sticky = header.sticky,
    stickyMobile = header.stickyMobile,
    ...rest
  } = props

  const partial = sticky
    ? {
        position: stickyMobile ? 'sticky' : ['initial', 'sticky'],
        top: 0,
      }
    : null

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
