import React from 'react'
import { Box } from 'theme-ui'

const Main = React.forwardRef(({ variant = 'main', ...props }, ref) => (
  <Box
    ref={ref}
    as="main"
    id="content"
    role="main"
    variant={variant}
    {...props}
    __css={{ flex: 1 }}
  />
))

export default Main
