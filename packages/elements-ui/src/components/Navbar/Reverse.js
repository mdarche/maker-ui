import React from 'react'
import { Flex } from 'theme-ui'

import { Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const Reverse = React.forwardRef(
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
  ) => (
    <Flex
      ref={ref}
      variant={variant}
      {...props}
      __css={{ variant: 'eui_header.columns', maxWidth }}>
      <Flex className="col-1">
        <Menu menuItems={menu} location={location} />
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
)

export default Reverse
