import React from 'react'
import { Flex, Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'

export const Topbar = React.forwardRef((props, ref) => {
  const { topbar } = useOptions()

  const {
    bg = 'bg_topbar',
    maxWidth = 'maxWidth_topbar',
    sticky = topbar.sticky,
    sx,
    ...rest
  } = props

  const partial = sticky
    ? {
        position: 'sticky',
        top: 0,
        zIndex: 101,
      }
    : null

  return (
    <Box
      as="aside"
      ref={ref}
      role="complementary"
      sx={{
        bg,
        display: topbar.hideOnMobile ? ['none', 'block'] : 'block',
        ...partial,
      }}>
      <Flex
        {...rest}
        sx={{
          mx: 'auto',
          overflowX: 'scroll',
          whiteSpace: 'nowrap',
          maxWidth,
          p: 2,
          ...sx,
        }}
      />
    </Box>
  )
})
