import React from 'react'

import { NavProps } from '../props'
import {
  Flex,
  Logo,
  Menu,
  MenuButton,
  ColorButton,
  WidgetArea,
} from '../common'

const defaultProps = {
  logo: 'logo',
  maxWidth: 'maxWidth_header',
  variant: 'navbar',
}

export const Reverse = ({
  logo,
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
  maxWidth,
  variant,
  ...props
}: NavProps) => (
  <Flex
    variant={variant}
    {...props}
    __css={{ variant: 'mui_header.columns', maxWidth }}>
    <Flex className="col-1">
      <Menu menuItems={menu} />
      <MenuButton custom={menuToggle} />
    </Flex>
    <Flex className="col-2">
      <Logo>{logo}</Logo>
    </Flex>
    <Flex className="col-3">
      <WidgetArea custom={widgetArea} />
      <ColorButton custom={colorToggle} />
    </Flex>
  </Flex>
)

Reverse.defaultProps = defaultProps
