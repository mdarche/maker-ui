import React from "react"
import { Box } from "theme-ui"

export const Main = React.forwardRef(({ sx, ...props }, ref) => (
  <Box
    ref={ref}
    as="main"
    id="content"
    role="main"
    {...props}
    sx={{ flex: 1, ...sx }}
  />
))
