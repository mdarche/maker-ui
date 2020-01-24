import React from 'react'
import { Flex } from 'theme-ui'

import { Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const Reverse = ({
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
    sx={{ variant: 'eui_header.columns', maxWidth, ...sx }}>
    <Flex className="col-1">
      <Menu menuItems={menu} />
      <MenuButton custom={menuToggle} />
    </Flex>
    <Flex id="site-logo" className="col-2" variant="header.logo">
      <a href="/">{logo}</a>
    </Flex>
    <Flex className="col-3">
      <WidgetArea custom={widgetArea} />
      <ColorButton custom={colorToggle} />
    </Flex>
  </Flex>
)

export default Reverse
