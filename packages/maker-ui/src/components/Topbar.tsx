import React from 'react'

import { Box, Flex } from './common'
import { BoxProps } from './props'
import { useOptions } from '../context/OptionContext'
import { setBreakpoint } from '../utils/helper'

interface TopbarProps extends BoxProps {
  background?: string | string[]
  maxWidth?: string | string[]
  scrollOverflow?: boolean
}

const defaultProps = {
  bg: 'bg_topbar',
  maxWidth: 'maxWidth_topbar',
  variant: 'topbar',
  scrollOverflow: false,
}

export const Topbar = React.forwardRef<HTMLElement, TopbarProps>(
  ({ bg, maxWidth, variant, scrollOverflow, ...props }, ref) => {
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
          className="container"
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

Topbar.defaultProps = defaultProps
