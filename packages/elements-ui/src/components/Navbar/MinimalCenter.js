import React from 'react'
import { Box, Flex } from 'theme-ui'

import { MenuButton, ColorButton, WidgetArea } from '../common'

const MinimalCenter = React.forwardRef(
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
      __css={{ variant: 'eui_header.columns', maxWidth }}>
      <Flex className="col-1">
        <MenuButton custom={menuToggle} desktopVisible />
      </Flex>
      <Flex className="col-2">
        <Box id="site-logo" variant="header.logo">
          <a href="/">{logo}</a>
        </Box>
      </Flex>
      <Flex className="col-3">
        <WidgetArea custom={widgetArea} />
        <ColorButton custom={colorToggle} />
      </Flex>
    </Flex>
  )
)

export default MinimalCenter
