'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { useColorTheme } from './Provider'

type ColorButtonProps =
  | React.ReactNode
  | ((
      currentMode?: string,
      attrs?: object,
      preference?: string
    ) => React.ReactNode)

interface ColorProps extends React.HTMLAttributes<HTMLButtonElement> {
  jsx?: ColorButtonProps
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
 *
 * @link https://maker-ui.com/docs/layout/buttons/#colorButton
 */
export const ColorButton = ({ className, jsx, ...props }: ColorProps) => {
  const { current, themes, setColorTheme } = useColorTheme()

  // Never render this component if themes are undefined
  if (!themes) return null

  const cycleMode = () => {
    const i = themes.indexOf(current as string)
    const next = themes[(i + 1) % themes.length]

    if (next) {
      setColorTheme(next)
    }
  }

  const attributes = {
    title: 'Color Theme',
    className: cn(['btn-color-mode', className]),
    'aria-label': 'Toggle Color Mode',
    onClick: cycleMode,
    ...props,
  }

  if (themes?.length === 1) {
    return null
  }

  /** If this is the header, make sure `showColorButton` is true */

  return typeof jsx === 'function' ? (
    (jsx(current, attributes) as React.ReactNode)
  ) : (
    <button {...attributes}>{jsx ?? current}</button>
  )
}

ColorButton.displayName = 'ColorButton'
