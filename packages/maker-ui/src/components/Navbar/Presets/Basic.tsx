import * as React from 'react'

import { NavProps } from '../'
import { setBreakpoint } from '../../../utils/helper'
import { Flex } from '../../Primitives'
import { WidgetArea } from '../WidgetArea'
import { Logo } from '../Logo'
import { ColorButton } from '../ColorButton'
import { NavMenu, MenuButton } from '../../Menu'
import { headerStyles } from './shared-styles'

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
