import React from 'react'
import { Flex, Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import setBreakpoint from '../utils/helper'

const Topbar = React.forwardRef(
  (
    {
      bg = 'bg_topbar',
      maxWidth = 'maxWidth_topbar',
      variant = 'topbar',
      scrollOverflow = false,
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
            ? setBreakpoint(topbar.breakIndex, ['none', 'block'])
            : 'block',
        }}>
        <Flex
          {...props}
          __css={{
            mx: 'auto',
            overflowX: scrollOverflow ? 'scroll' : null,
            whiteSpace: scrollOverflow ? 'nowrap' : null,
            maxWidth,
          }}
        />
      </Box>
    )
  }
)

export default Topbar
