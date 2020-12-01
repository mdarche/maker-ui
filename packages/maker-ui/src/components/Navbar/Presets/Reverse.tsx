import * as React from 'react'

import { NavProps } from '../'
import { Flex } from '../../Primitives'

import { Logo } from '../Logo'
import { WidgetArea } from '../WidgetArea'
import { ColorButton } from '../ColorButton'
import { NavMenu, MenuButton } from '../../Menu'

import { headerStyles } from './shared-styles'

/**
 * Formats the inner layout styles for the `reverse` nav type.
 *
 * @internal usage only
 */

export const Reverse = ({
  variant = 'navbar',
  logo = 'logo',
  menu,
  colorButton,
  menuButton,
  widgetArea,
  maxWidth,
  sx,
}: NavProps) => (
  <Flex
    variant={variant}
    // @ts-ignore
    sx={{
      ...headerStyles.columns,
      maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
      ...sx,
    }}>
    <Flex className="col-1">
      <NavMenu menuItems={menu} />
      <MenuButton customButton={menuButton} />
    </Flex>
    <Flex className="col-2">
      <Logo>{logo}</Logo>
    </Flex>
    <Flex className="col-3">
      <WidgetArea content={widgetArea} />
      <ColorButton customButton={colorButton} />
    </Flex>
  </Flex>
)

Reverse.displayName = 'ReverseNav'
