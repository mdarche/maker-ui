import React from 'react'
import { Box, Flex } from 'theme-ui'

import { MenuButton, ColorButton, WidgetArea } from '../common'

const MinimalLeft = ({
  logo = 'Logo',
  widgetArea,
  menuToggle,
  colorToggle,
  maxWidth = 'maxWidth_header',
  variant = 'navbar',
  sx,
}) => (
  <Flex
    variant={variant}
    sx={{ variant: 'eui_header.default', maxWidth, ...sx }}>
    <Flex sx={{ alignItems: 'center' }}>
      <MenuButton custom={menuToggle} desktopVisible />
      <Box id="site-logo" variant="header.logo">
        <a href="/">{logo}</a>
      </Box>
    </Flex>
    <Flex sx={{ alignItems: 'center' }}>
      <WidgetArea custom={widgetArea} />
      <ColorButton custom={colorToggle} />
    </Flex>
  </Flex>
)

export default MinimalLeft
