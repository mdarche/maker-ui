import React from 'react'

import { NavProps } from '../types'
import { Flex, Logo, MenuButton, ColorButton, WidgetArea } from '../common'
import { headerStyles } from './styles'

const getStyles = type =>
  type === 3 ? headerStyles.columns : headerStyles.default

export const Minimal = ({
  variant = 'navbar',
  logo = 'logo',
  widgetArea,
  menuToggle,
  colorToggle,
  maxWidth,
  layout,
  sx,
  ...props
}: NavProps) => (
  <Flex
    variant={variant}
    // @ts-ignore
    sx={{
      ...getStyles(layout),
      maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
      ...sx,
    }}
    {...props}>
    {layout === 1 ? (
      <>
        <Logo>{logo}</Logo>
        <Flex align="center">
          <WidgetArea custom={widgetArea} />
          <MenuButton custom={menuToggle} visibleOnDesktop />
          <ColorButton custom={colorToggle} />
        </Flex>
      </>
    ) : layout === 2 ? (
      <>
        <Flex align="center">
          <MenuButton custom={menuToggle} visibleOnDesktop />
          <Logo>{logo}</Logo>
        </Flex>
        <Flex align="center">
          <WidgetArea custom={widgetArea} />
          <ColorButton custom={colorToggle} />
        </Flex>
      </>
    ) : (
      <>
        <Flex className="col-1">
          <MenuButton custom={menuToggle} visibleOnDesktop />
        </Flex>
        <Flex className="col-2">
          <Logo>{logo}</Logo>
        </Flex>
        <Flex className="col-3">
          <WidgetArea custom={widgetArea} />
          <ColorButton custom={colorToggle} />
        </Flex>
      </>
    )}
  </Flex>
)
