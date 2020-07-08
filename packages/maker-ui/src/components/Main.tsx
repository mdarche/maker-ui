import React from 'react'

import { Box } from './common'
import { BoxProps } from './props'

const defaultProps = {
  variant: 'main',
}

/**
 * Use the `Main` component to wrap your layout's main content.
 * @see https://maker-ui.com/components/main
 */

export const Main = React.forwardRef<HTMLElement, BoxProps>(
  ({ variant, ...props }, ref) => (
    <Box
      ref={ref}
      as="main"
      variant={variant}
      id="content"
      role="main"
      {...props}
      __css={{ flex: 1 }}
    />
  )
)

Main.defaultProps = defaultProps
