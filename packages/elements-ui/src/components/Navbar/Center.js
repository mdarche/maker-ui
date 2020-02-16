import React from 'react'
import { Box, Flex } from 'theme-ui'

import { Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const Center = React.forwardRef(
  (
    {
      logo = 'Logo',
      menu,
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
      __css={{
        variant: 'eui_header.center',
        flexDirection: ['row', 'column'],
        maxWidth,
      }}>
      <Flex>
        <Box id="site-logo" variant="header.logo">
          <a href="/" aria-label="Home page">
            {logo}
          </a>
        </Box>
      </Flex>
      <Flex sx={{ alignItems: 'center' }}>
        <Menu menuItems={menu} />
        <Box>
          <WidgetArea custom={widgetArea} />
          <MenuButton custom={menuToggle} />
          <ColorButton custom={colorToggle} />
        </Box>
      </Flex>
    </Flex>
  )
)

export default Center
