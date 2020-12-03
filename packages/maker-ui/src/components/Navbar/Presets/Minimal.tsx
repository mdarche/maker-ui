import * as React from 'react'

import { NavProps } from '../'
import { Flex } from '../../Primitives'

import { Logo } from '../Logo'
import { WidgetArea } from '../WidgetArea'
import { ColorButton } from '../ColorButton'
import { MenuButton } from '../../Menu'

import { headerStyles } from './shared-styles'

const getStyles = type =>
  type === 'minimal-center' ? headerStyles.columns : headerStyles.default

/**
 * Formats the inner layout styles for `minimal` and `minimal-center` and
 * `minimal-left` nav types.
 *
 * @internal usage only
 */

export const Minimal = ({
  variant = 'navbar',
  logo = 'logo',
  widgetArea,
  colorButton,
  menuButton,
  maxWidth,
  type,
  sx,
}: NavProps) => (
  <Flex
    variant={variant}
    // @ts-ignore
    sx={{
      ...getStyles(type),
      maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
      ...sx,
    }}>
    {type === 'minimal' ? (
      <>
        <Logo>{logo}</Logo>
        <Flex align="center">
          <WidgetArea content={widgetArea} />
          <MenuButton customButton={menuButton} visibleOnDesktop />
          <ColorButton customButton={colorButton} />
        </Flex>
      </>
    ) : type === 'minimal-left' ? (
      <>
        <Flex align="center">
          <MenuButton customButton={menuButton} visibleOnDesktop />
          <Logo>{logo}</Logo>
        </Flex>
        <Flex align="center">
          <WidgetArea content={widgetArea} />
          <ColorButton customButton={colorButton} />
        </Flex>
      </>
    ) : (
      <>
        <Flex className="col-1">
          <MenuButton customButton={menuButton} visibleOnDesktop />
        </Flex>
        <Flex className="col-2">
          <Logo>{logo}</Logo>
        </Flex>
        <Flex className="col-3">
          <WidgetArea content={widgetArea} />
          <ColorButton customButton={colorButton} />
        </Flex>
      </>
    )}
  </Flex>
)

Minimal.displayName = 'MinimalNav'