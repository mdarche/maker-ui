import React from 'react'
import { Box } from 'theme-ui'

const Main = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="main"
    id="content"
    role="main"
    {...props}
    __css={{ flex: 1 }}
  />
))

export default Main
