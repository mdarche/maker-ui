import React from 'react'
import { Box, Flex } from 'theme-ui'

import { Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const BasicCenter = ({
  logo = 'Logo',
  menu,
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
    <Box id="site-logo" variant="header.logo">
      <a href="/">{logo}</a>
    </Box>
    <Menu menuItems={menu} />
    <Flex sx={{ alignItems: 'center' }}>
      <WidgetArea custom={widgetArea} />
      <MenuButton custom={menuToggle} />
      <ColorButton custom={colorToggle} />
    </Flex>
  </Flex>
)

export default BasicCenter
