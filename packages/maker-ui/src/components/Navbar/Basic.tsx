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
  ...props
}: NavProps) => (
  <Flex
    variant={variant}
    {...props}
    sx={{
      variant: 'mui_header.default',
      maxWidth: t => t.sizes.maxWidth_header,
    }}>
    <Logo>{logo}</Logo>
    <Flex
      sx={{
        alignItems: 'center',
        flex: layout === 2 ? 1 : 'initial',
        justifyContent:
          layout === 2
            ? setBreakpoint(bp, ['flex-end', 'space-between'])
            : null,
      }}>
      {React.isValidElement(menu) ? menu : <NavMenu menuItems={menu} />}
      <Flex sx={{ alignItems: 'center' }}>
        <WidgetArea custom={widgetArea} />
        <MenuButton custom={menuToggle} />
        <ColorButton custom={colorToggle} />
      </Flex>
    </Flex>
  </Flex>
)
