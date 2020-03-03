import React from 'react'
import { Box, Flex } from 'theme-ui'

import { Logo, MenuButton, ColorButton, WidgetArea } from '../common'

const Minimal = React.forwardRef(
  (
    {
      logo = 'Logo',
      widgetArea,
      menuToggle,
      colorToggle,
      maxWidth = 'maxWidth_header',
      variant = 'navbar',
      type,
      ...props
    },
    ref
  ) => (
    <Flex
      ref={ref}
      variant={variant}
      {...props}
      __css={{
        variant: type === 3 ? 'eui_header.columns' : 'eui_header.default',
        maxWidth,
      }}>
      {type === 1 ? (
        <React.Fragment>
          <Logo>{logo}</Logo>
          <Flex sx={{ alignItems: 'center' }}>
            <WidgetArea custom={widgetArea} />
            <MenuButton custom={menuToggle} visibleOnDesktop />
            <ColorButton custom={colorToggle} />
          </Flex>
        </React.Fragment>
      ) : type === 2 ? (
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
)

export default Minimal
