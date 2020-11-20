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
  menuButtonInner,
  customMenuButton,
  colorButtonInner,
  customColorButton,
  widgetArea,
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
      <NavMenu menuItems={menu} />
      <Flex align="center">
        <WidgetArea content={widgetArea} />
        <MenuButton
          buttonInner={menuButtonInner}
          customButton={customMenuButton}
        />
        <ColorButton
          buttonInner={colorButtonInner}
          customButton={customColorButton}
        />
      </Flex>
    </Flex>
  </Flex>
)

Basic.displayName = 'BasicNav'
