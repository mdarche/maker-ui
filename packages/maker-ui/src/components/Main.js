import React from 'react'
import { Box } from 'theme-ui'

// interface Props {
//   variant?: string
// }
// const defaultProps = {
//   variant: 'main',
// }

const Main = React.forwardRef(({ variant, ...props }, ref) => (
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

// Main.defaultProps = defaultProps

export default Main
