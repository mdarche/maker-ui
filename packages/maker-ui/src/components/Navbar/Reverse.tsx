import React from 'react'

import { NavProps } from '../types'
import {
  Flex,
  Logo,
  NavMenu,
  MenuButton,
  ColorButton,
  WidgetArea,
} from '../common'
import { headerStyles } from './styles'

export const Reverse = ({
  variant = 'navbar',
  logo = 'logo',
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
  maxWidth,
  sx,
  ...props
}: NavProps) => (
  <Flex
    variant={variant}
    // @ts-ignore
    sx={{
      ...headerStyles.columns,
      maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
      ...sx,
    }}
    {...props}>
    <Flex className="col-1">
      {React.isValidElement(menu) ? menu : <NavMenu menuItems={menu} />}
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
