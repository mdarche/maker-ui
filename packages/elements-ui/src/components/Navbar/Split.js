import React from 'react'
import { Box, Flex } from 'theme-ui'

import { Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const Split = React.forwardRef(
  (
    {
      logo = 'Logo',
      menu,
      widgetArea,
      menuToggle,
      colorToggle,
      location,
      maxWidth = 'maxWidth_header',
      variant = 'navbar',
      ...props
    },
    ref
  ) => {
    const mid = Math.ceil(menu.length / 2)

    return (
      <Flex
        ref={ref}
        variant={variant}
        {...props}
        __css={{ variant: 'eui_header.center', maxWidth }}>
        <Menu menuItems={menu.slice(0, mid)} location={location} />
        <Box id="site-logo" variant="header.logo">
          <a href="/" aria-label="Home page">
            {logo}
          </a>
        </Box>
        <Menu menuItems={menu.slice(mid)} location={location} />
        <Flex
          sx={{
            position: ['relative', 'absolute'],
            right: 0,
            alignItems: 'center',
          }}>
          <WidgetArea custom={widgetArea} />
          <MenuButton custom={menuToggle} />
          <ColorButton custom={colorToggle} />
        </Flex>
      </Flex>
    )
  }
)

export default Split
