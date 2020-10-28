import React from 'react'

import { NavProps } from '../types'
import { setBreakpoint } from '../../utils/helper'
import {
  Flex,
  NavMenu,
  MenuButton,
  ColorButton,
  WidgetArea,
  Logo,
} from '../common'
import { headerStyles } from './styles'

export const Basic = ({
  logo = 'logo',
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
  bp,
  layout,
  maxWidth,
  variant = 'navbar',
  sx,
  ...props
}: NavProps) => (
  <Flex
    variant={variant}
    // @ts-ignore
    sx={{
      ...headerStyles.default,
      maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
      ...sx,
    }}
    {...props}>
    <Logo>{logo}</Logo>
    <Flex
      align="center"
      flex={layout === 2 ? 1 : 'initial'}
      justify={
        layout === 2 ? setBreakpoint(bp, ['flex-end', 'space-between']) : null
      }>
      {React.isValidElement(menu) ? menu : <NavMenu menuItems={menu} />}
      <Flex align="center">
        <WidgetArea custom={widgetArea} />
        <MenuButton custom={menuToggle} />
        <ColorButton custom={colorToggle} />
      </Flex>
    </Flex>
  </Flex>
)
