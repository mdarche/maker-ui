import * as React from 'react'

import { NavProps } from '../'
import { setBreakpoint } from '../../../utils/helper'
import { Flex } from '../../Primitives'

import { Logo } from '../Logo'
import { WidgetArea } from '../WidgetArea'
import { ColorButton } from '../ColorButton'
import { NavMenu, MenuButton } from '../../Menu'

import { headerStyles } from './shared-styles'

/**
 * Formats the inner layout styles for `center` nav types.
 *
 * @internal usage only
 */

export const Center = ({
  variant = 'navbar',
  logo = 'logo',
  menu,
  menuButtonInner,
  customMenuButton,
  colorButtonInner,
  customColorButton,
  widgetArea,
  bp,
  type,
  maxWidth,
  sx,
}: NavProps) => {
  return (
    <Flex
      variant={variant}
      direction={setBreakpoint(bp, ['row', 'column'])}
      // @ts-ignore
      sx={{
        ...headerStyles.center,
        maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
        ...sx,
      }}>
      <Flex justify={['flex-start', 'center']}>
        <Logo>{logo}</Logo>
      </Flex>
      <Flex align="center">
        <NavMenu menuItems={menu} />
        <Flex
          sx={{
            position: setBreakpoint(bp, ['relative', 'absolute']),
            right: 0,
            alignItems: 'center',
          }}>
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
}

Center.displayName = 'CenterNav'
