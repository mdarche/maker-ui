import React from 'react'

import { NavProps } from '../types'
import { Flex, Logo, MenuButton, ColorButton, WidgetArea } from '../common'

const defaultProps = {
  logo: 'logo',
  maxWidth: 'maxWidth_header',
  variant: 'navbar',
}

export const Minimal = ({
  logo,
  widgetArea,
  menuToggle,
  colorToggle,
  maxWidth,
  variant,
  layout,
  ...props
}: NavProps) => (
  <Flex
    variant={variant}
    {...props}
    __css={{
      variant: layout === 3 ? 'mui_header.columns' : 'mui_header.default',
      maxWidth,
    }}>
    {layout === 1 ? (
      <React.Fragment>
        <Logo>{logo}</Logo>
        <Flex sx={{ alignItems: 'center' }}>
          <WidgetArea custom={widgetArea} />
          <MenuButton custom={menuToggle} visibleOnDesktop />
          <ColorButton custom={colorToggle} />
        </Flex>
      </React.Fragment>
    ) : layout === 2 ? (
      <React.Fragment>
        <Flex sx={{ alignItems: 'center' }}>
          <MenuButton custom={menuToggle} visibleOnDesktop />
          <Logo>{logo}</Logo>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          <WidgetArea custom={widgetArea} />
          <ColorButton custom={colorToggle} />
        </Flex>
      </React.Fragment>
    ) : (
      <React.Fragment>
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
      </React.Fragment>
    )}
  </Flex>
)

Minimal.defaultProps = defaultProps
