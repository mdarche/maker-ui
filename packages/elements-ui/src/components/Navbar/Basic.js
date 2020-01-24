import React from 'react'
import { Box, Flex } from 'theme-ui'

import { Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const Basic = ({
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
    sx={{
      variant: 'eui_header.default',
      maxWidth,
      ...sx,
    }}>
    <Box id="site-logo" variant="header.logo">
      <a href="/">{logo}</a>
    </Box>
    <Flex sx={{ alignItems: 'center' }}>
      <Menu menuItems={menu} />
      <Flex sx={{ alignItems: 'center' }}>
        <WidgetArea custom={widgetArea} />
        <MenuButton custom={menuToggle} />
        <ColorButton custom={colorToggle} />
      </Flex>
    </Flex>
  </Flex>
)

export default Basic
