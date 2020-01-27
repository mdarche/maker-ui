import React from 'react'
import { Box } from 'theme-ui'

export const Main = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="main"
    id="content"
    role="main"
    {...props}
    __css={{ flex: 1 }}
  />
))
