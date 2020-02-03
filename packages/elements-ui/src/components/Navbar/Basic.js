import React from 'react'
import { Box, Flex } from 'theme-ui'

import { Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const Basic = React.forwardRef(
  (
    {
      logo = 'Logo',
      menu,
      widgetArea,
      menuToggle,
      colorToggle,
      justify,
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
        variant: 'eui_header.default',
        maxWidth,
      }}>
      <Box id="site-logo" variant="header.logo">
        <a href="/">{logo}</a>
      </Box>
      <Flex
        sx={{
          alignItems: 'center',
          flex: justify === 'space-between' ? 1 : 'initial',
          justifyContent: justify,
        }}>
        <Menu menuItems={menu} />
        <Flex sx={{ alignItems: 'center' }}>
          <WidgetArea custom={widgetArea} />
          <MenuButton custom={menuToggle} />
          <ColorButton custom={colorToggle} />
        </Flex>
      </Flex>
    </Flex>
  )
)

export default Basic
