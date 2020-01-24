import React from 'react'
import { Flex, Box } from 'theme-ui'

import { useOptions } from '../context/ElementsContext'

export const Header = React.forwardRef((props, ref) => {
  const { header } = useOptions()

  const {
    bg = 'bg_header',
    maxWidth = 'maxWidth_header',
    sticky = header.sticky,
    stickyMobile = header.stickyMobile,
    variant = 'header',
    sx,
    ...rest
  } = props

  const partial = sticky
    ? {
        position: stickyMobile ? 'sticky' : ['initial', 'sticky'],
        top: 0,
      }
    : null

  console.log(partial)

  return (
    <Box
      ref={ref}
      as="header"
      id="site-header"
      role="banner"
      variant={variant}
      bg={bg}
      {...rest}
      sx={{
        zIndex: 100,
        partial,
        ...sx,
      }}
    />
  )
})
