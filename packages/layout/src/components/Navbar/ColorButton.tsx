import * as React from 'react'
import { Button, ButtonProps } from '@maker-ui/primitives'

import { MakerOptions } from '../../types'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint, mergeSelector } from '../../utils/helper'
import { useColorTheme } from '../../context/LayoutContext'

interface ColorButtonProps extends ButtonProps {
  isHeaderButton?: boolean
  customButton?: MakerOptions['header']['colorButton']
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
 *
 * @todo - Find a way to (efficiently) sync multiple instances of ColorButton without using
 * an app provider
 *
 * @link https://maker-ui.com/docs/layout/buttons/#colorButton
 */

export const ColorButton = ({
  isHeaderButton,
  customButton,
  breakpoints,
  className,
  css,
  ...props
}: ColorButtonProps) => {
  const { header, breakpoints: bps } = useOptions()
  const { colorTheme, setColorTheme, colors } = useColorTheme()

  const cycleMode = () => {
    const i = colors.indexOf(colorTheme as string)
    const next = colors[(i + 1) % colors.length]

    setColorTheme(next)
  }

  const attributes = {
    title: 'Color Theme',
    className: mergeSelector('color-button', className),
    'aria-label': 'Toggle Color Mode',
    onClick: cycleMode,
    breakpoints: isHeaderButton
      ? setBreakpoint(header.breakpoint, bps)
      : breakpoints,
    ...props,
  }

  // Use custom button from props or check header options
  const colorButton = customButton || header.colorButton

  if (colors.length === 1) {
    return null
  }

  /** If this is the header, make sure `showColorButton` is true */

  if ((isHeaderButton && header.showColorButton) || !isHeaderButton) {
    return typeof colorButton === 'function' ? (
      colorButton(colorTheme, attributes)
    ) : (
      <Button
        {...attributes}
        css={{
          display:
            isHeaderButton && header.hideColorButtonOnMobile
              ? ['none', 'block']
              : ['block'],
          ...(css as object),
        }}>
        {colorButton || colorTheme}
      </Button>
    )
  }
  return null
}

ColorButton.displayName = 'ColorButton'
