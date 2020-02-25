import React from 'react'
import { Box, Flex } from 'theme-ui'

import setBreakpoint from '../../utils/set-breakpoint'
import { Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const Center = React.forwardRef(
  (
    {
      logo = 'Logo',
      menu,
      widgetArea,
      menuToggle,
      colorToggle,
      bp,
      type,
      maxWidth = 'maxWidth_header',
      variant = 'navbar',
      ...props
    },
    ref
  ) => {
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
        ref={ref}
        variant={variant}
        {...props}
        __css={{
          variant: 'eui_header.center',
          flexDirection:
            type === 1 ? setBreakpoint(bp, ['row', 'column']) : null,
          maxWidth,
        }}>
        {type === 1 ? (
          <React.Fragment>
            <Flex>
              <Box id="site-logo" variant="header.logo">
                <a href="/" aria-label="Home page">
                  {logo}
                </a>
              </Box>
            </Flex>
            <Flex sx={{ alignItems: 'center' }}>
              <Menu menuItems={menu} />
              {renderBlock()}
            </Flex>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Menu menuItems={menu.slice(0, mid)} />
            <Box id="site-logo" variant="header.logo">
              <a href="/" aria-label="Home page">
                {logo}
              </a>
            </Box>
            <Menu menuItems={menu.slice(mid)} />
            {renderBlock()}
          </React.Fragment>
        )}
      </Flex>
    )
  }
)

export default Center
