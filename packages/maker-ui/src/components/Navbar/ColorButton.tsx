import * as React from 'react'

import { Button } from '../Primitives'
import { MakerOptions } from '../../types'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface ColorButtonProps {
  customButton?: MakerOptions['header']['colorButton']
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
 *
 * @see https://maker-ui.com/docs/layout/buttons/#colorButton
 */

export const ColorButton = ({ customButton }: ColorButtonProps) => {
  const { header, colors } = useOptions()
  const [theme, setTheme] = React.useState(colors.initialTheme || 'light')

  const { initialTheme, ...colorModes } = colors

  const modes = colorModes ? Object.keys(colorModes) : [initialTheme]

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
    className: 'color-button',
    'aria-label': 'Toggle Color Mode',
    onClick: cycleMode,
  }

  // Use custom button from props or check header options
  const colorButton = customButton || header.colorButton

  if (modes.length === 1) {
    return null
  }

  if (header.showColorButton) {
    return typeof colorButton === 'function' ? (
      colorButton(theme, attributes)
    ) : (
      <Button
        {...attributes}
        sx={{
          display: header.hideColorButtonOnMobile
            ? setBreakpoint(header.bpIndex, ['none', 'block'])
            : 'block',
        }}>
        {colorButton || theme}
      </Button>
    )
  }
  return null
}

ColorButton.displayName = 'ColorButton'
