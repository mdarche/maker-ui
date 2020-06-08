import React from 'react'

import { NavProps } from '../props'
import { setBreakpoint } from '../../utils/helper'
import {
  Flex,
  Menu,
  MenuButton,
  ColorButton,
  WidgetArea,
  Logo,
} from '../common'

const defaultProps = {
  logo: 'logo',
  maxWidth: 'maxWidth_header',
  variant: 'navbar',
}

export const Basic = ({
  logo,
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
  bp,
  layout,
  maxWidth,
  variant,
  ...props
}: NavProps) => (
  <Flex
    variant={variant}
    {...props}
    __css={{
      variant: 'mui_header.default',
      maxWidth,
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
      <Menu menuItems={menu} />
      <Flex sx={{ alignItems: 'center' }}>
        <WidgetArea custom={widgetArea} />
        <MenuButton custom={menuToggle} />
        <ColorButton custom={colorToggle} />
      </Flex>
    </Flex>
  </Flex>
)

Basic.defaultProps = defaultProps
