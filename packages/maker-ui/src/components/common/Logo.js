import React from 'react'
import { Box } from 'theme-ui'

const Logo = ({ children, ...props }) => (
  <Box
    as="a"
    href="/"
    id="site-logo"
    variant="header.logo"
    aria-label="Home page"
    sx={{ display: 'flex' }}
    {...props}>
    {children}
  </Box>
)

export default Logo
