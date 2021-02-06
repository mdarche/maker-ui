import * as React from 'react'
import { Button, ButtonProps } from '@maker-ui/primitives'

import { MakerOptions } from '../../types'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint, setClassName } from '../../utils/helper'

interface ColorButtonProps extends ButtonProps {
  isHeaderButton?: boolean
  customButton?: MakerOptions['header']['colorButton']
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
 *
 * @todo - Find a way to efficiently sync multiple instances of ColorButton without using
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
}: ColorButtonProps) => {
  const { header, colors, breakpoints: bps } = useOptions()
  const [theme, setTheme] = React.useState(Object.keys(colors)[0] || 'light')

  const modes = colors ? Object.keys(colors) : ['light']

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  const cycleMode = () => {
    const i = modes.indexOf(theme)
    const next = modes[(i + 1) % modes.length]

    setTheme(next)
  }

  const attributes = {
    title: 'Color Mode',
    className: setClassName('color-button', className),
    'aria-label': 'Toggle Color Mode',
    onClick: cycleMode,
    breakpoints: isHeaderButton
      ? setBreakpoint(header.breakpoint, bps)
      : breakpoints,
  }

  // Use custom button from props or check header options
  const colorButton = customButton || header.colorButton

  if (modes.length === 1) {
    return null
  }

  /** If this is the header, make sure `showColorButton` is true */

  if ((isHeaderButton && header.showColorButton) || !isHeaderButton) {
    return typeof colorButton === 'function' ? (
      colorButton(theme, attributes)
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
        {colorButton || theme}
      </Button>
    )
  }
  return null
}

ColorButton.displayName = 'ColorButton'
