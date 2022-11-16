import * as React from 'react'
import { Button, ButtonProps } from '@maker-ui/primitives'
import { setBreakpoint, cn } from '@maker-ui/utils'

import type { MakerOptions } from '../../types'
import { useOptions } from '../../context/OptionContext'
import { useColorTheme } from '../../context/LayoutContext'

interface ColorButtonProps extends ButtonProps {
  /** For internal usage with a Maker UI header layout */
  isHeaderButton?: boolean
  /** A React Node for using a custom icon or a callback function that gives you access to all color themes */
  customButton?: MakerOptions['header']['colorButton']
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
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
}: ColorButtonProps): React.ReactNode => {
  const { header, breakpoints: bps } = useOptions()
  const { colorTheme, setColorTheme, themes, preference } = useColorTheme()

  // Never render this component if themes are undefined
  if (!themes) return null

  const cycleMode = () => {
    const i = themes.indexOf(colorTheme as string)
    const next = themes[(i + 1) % themes.length]

    setColorTheme(next)
  }

  const attributes = {
    title: 'Color Theme',
    className: cn(['color-button', className]),
    'aria-label': 'Toggle Color Mode',
    onClick: cycleMode,
    breakpoints: isHeaderButton
      ? setBreakpoint(header.breakpoint, bps)
      : breakpoints,
    ...props,
  }

  // Use custom button from props or check header options
  const colorButton = customButton || header.colorButton

  if (themes?.length === 1) {
    return null
  }

  /** If this is the header, make sure `showColorButton` is true */

  if ((isHeaderButton && header.showColorButton) || !isHeaderButton) {
    return typeof colorButton === 'function' ? (
      colorButton(colorTheme, attributes, preference)
    ) : (
      <Button
        {...attributes}
        css={{
          display:
            isHeaderButton && header.showColorButtonOnMobile
              ? ['block']
              : ['none', 'block'],
          ...(css as object),
        }}>
        {colorButton ?? colorTheme}
      </Button>
    )
  }
  return null
}

ColorButton.displayName = 'ColorButton'
