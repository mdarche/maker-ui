import React from 'react'
import { Box, Flex } from 'theme-ui'

import { MenuButton, ColorButton, WidgetArea } from '../common'

const MinimalLeft = React.forwardRef(
  (
    {
      logo = 'Logo',
      widgetArea,
      menuToggle,
      colorToggle,
      maxWidth = 'maxWidth_header',
      variant = 'navbar',
      ...props
    },
    ref
  ) => (
    <Flex
      ref={ref}
      variant={variant}
      {...props}
      __css={{ variant: 'eui_header.default', maxWidth }}>
      <Flex sx={{ alignItems: 'center' }}>
        <MenuButton custom={menuToggle} visibleOnDesktop />
        <Box id="site-logo" variant="header.logo">
          <a href="/" aria-label="Home page">
            {logo}
          </a>
        </Box>
      </Flex>
      <Flex sx={{ alignItems: 'center' }}>
        <WidgetArea custom={widgetArea} />
        <ColorButton custom={colorToggle} />
      </Flex>
    </Flex>
  )
)

export default MinimalLeft
