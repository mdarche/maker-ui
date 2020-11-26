import * as React from 'react'

import { NavProps } from '../'
import { setBreakpoint } from '../../../utils/helper'
import { Flex, Grid } from '../../Primitives'

import { Logo } from '../Logo'
import { WidgetArea } from '../WidgetArea'
import { ColorButton } from '../ColorButton'
import { NavMenu, MenuButton } from '../../Menu'

import { headerStyles } from './shared-styles'

/**
 * Formats the inner layout styles for `center` and `split` nav types.
 *
 * @internal usage only
 */

export const Split = ({
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
  const mid = Math.ceil(menu.length / 2)

  return (
    <Grid
      variant={variant}
      columns={setBreakpoint(bp, ['.4fr .6fr', '1fr .45fr 1fr'])}
      // @ts-ignore
      sx={{
        ...headerStyles.split,
        maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
        ...sx,
      }}>
      <Flex
        className="nav-left col"
        justify="flex-end"
        sx={{
          display: setBreakpoint(bp, ['none', 'flex']),
        }}>
        <NavMenu menuItems={menu.slice(0, mid)} />
      </Flex>
      <Flex className="nav-center col">
        <Logo>{logo}</Logo>
      </Flex>
      <Flex
        className="nav-right col"
        justify="flex-start"
        sx={{ display: setBreakpoint(bp, ['none', 'flex']) }}>
        <NavMenu menuItems={menu.slice(mid)} />
      </Flex>
      <Flex
        className="nav-controls col"
        justify="flex-end"
        sx={{
          position: setBreakpoint(bp, ['relative', 'absolute']),
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
    </Grid>
  )
}

Split.displayName = 'SplitMenu'
