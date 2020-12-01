import * as React from 'react'

import { NavProps } from '../'
import { setBreakpoint } from '../../../utils/helper'
import { Flex } from '../../Primitives'
import { WidgetArea } from '../WidgetArea'
import { Logo } from '../Logo'
import { ColorButton } from '../ColorButton'
import { NavMenu, MenuButton } from '../../Menu'
import { headerStyles } from './shared-styles'

/**
 * Formats the inner layout styles for `basic` and `basic-left` nav types.
 *
 * @internal usage only
 */

export const Basic = ({
  logo = 'logo',
  menu,
  colorButton,
  menuButton,
  widgetArea,
  bp,
  type,
  maxWidth,
  variant = 'navbar',
  sx,
}: NavProps) => (
  <Flex
    variant={variant}
    // @ts-ignore
    sx={{
      ...headerStyles.default,
      maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
      ...sx,
    }}>
    <Logo>{logo}</Logo>
    <Flex
      align="center"
      flex={type === 'basic-left' ? 1 : 'initial'}
      justify={
        type === 'basic-left'
          ? setBreakpoint(bp, ['flex-end', 'space-between'])
          : null
      }>
      <NavMenu menuItems={menu} />
      <Flex align="center">
        <WidgetArea content={widgetArea} />
        <MenuButton customButton={menuButton} />
        <ColorButton customButton={colorButton} />
      </Flex>
    </Flex>
  </Flex>
)

Basic.displayName = 'BasicNav'
