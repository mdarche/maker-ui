import React from 'react'

import { NavProps } from '../types'
import { setBreakpoint } from '../../utils/helper'
import {
  Flex,
  Logo,
  NavMenu,
  MenuButton,
  ColorButton,
  WidgetArea,
} from '../common'
import { headerStyles } from './styles'

export const Center = ({
  variant = 'navbar',
  logo = 'logo',
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
  bp,
  layout,
  maxWidth,
  sx,
  ...props
}: NavProps) => {
  const mid = Math.ceil(menu.length / 2)

  const renderBlock = () => (
    <Flex
      sx={{
        position: setBreakpoint(bp, ['relative', 'absolute']),
        right: 0,
        alignItems: 'center',
      }}>
      <WidgetArea custom={widgetArea} />
      <MenuButton custom={menuToggle} />
      <ColorButton custom={colorToggle} />
    </Flex>
  )

  return (
    <Flex
      variant={variant}
      direction={layout === 1 ? setBreakpoint(bp, ['row', 'column']) : null}
      // @ts-ignore
      sx={{
        ...headerStyles.center,
        maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
        ...sx,
      }}
      {...props}>
      {layout === 1 ? (
        <>
          <Flex justify={['flex-start', 'center']}>
            <Logo>{logo}</Logo>
          </Flex>
          <Flex align="center">
            <NavMenu menuItems={menu} />
            {renderBlock()}
          </Flex>
        </>
      ) : (
        <>
          <NavMenu menuItems={menu.slice(0, mid)} />
          <Logo>{logo}</Logo>
          <NavMenu menuItems={menu.slice(mid)} />
          {renderBlock()}
        </>
      )}
    </Flex>
  )
}
