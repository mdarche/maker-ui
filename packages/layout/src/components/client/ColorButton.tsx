'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useColorTheme } from './Provider'

interface ColorProps extends React.HTMLAttributes<HTMLButtonElement> {
  renderProps?: (currentMode?: string, attrs?: object) => React.ReactNode
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
 *
 * @link https://maker-ui.com/docs/layout/color-button
 */
export const ColorButton = ({
  className,
  renderProps,
  children,
  ...props
}: ColorProps) => {
  const { current, themes, setColorTheme } = useColorTheme()

  // Never render this component if themes are undefined
  if (!themes || themes.length === 1) return null

  const cycleMode = () => {
    const i = themes.indexOf(current as string)
    const next = themes[(i + 1) % themes.length]

    if (next) {
      setColorTheme(next)
    }
  }

  const attributes = {
    title: 'Color Theme',
    className: cn(['mkui-btn-color', className]),
    'aria-label': 'Toggle Color Mode',
    onClick: cycleMode,
    ...props,
  }

  return renderProps ? (
    <>{renderProps(current, attributes) as React.ReactNode}</>
  ) : (
    <button {...attributes}>{children ?? current}</button>
  )
}

ColorButton.displayName = 'ColorButton'
