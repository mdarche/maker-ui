import React from 'react'
import { Flex, Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import setBreak from '../config/breakpoint'

export const Topbar = React.forwardRef(
  (
    {
      bg = 'bg_topbar',
      maxWidth = 'maxWidth_topbar',
      variant = 'topbar',
      ...props
    },
    ref
  ) => {
    const { topbar } = useOptions()

    return (
      <Box
        ref={ref}
        as="aside"
        variant={variant}
        role="complementary"
        bg={bg}
        sx={{
          display: topbar.hideOnMobile
            ? setBreak(topbar.breakIndex, ['none', 'block'])
            : 'block',
        }}>
        <Flex
          {...props}
          __css={{
            mx: 'auto',
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            maxWidth,
          }}
        />
      </Box>
    )
  }
)
