import React from 'react'

import { Box } from './common'
import { BoxProps } from './props'

const defaultProps = {
  variant: 'main',
}

export const Main = React.forwardRef<HTMLElement, BoxProps>(
  ({ variant, ...props }, ref) => (
    <Box
      ref={ref}
      as="main"
      id="content"
      role="main"
      {...props}
      __css={{ flex: 1 }}
    />
  )
)

Main.defaultProps = defaultProps
