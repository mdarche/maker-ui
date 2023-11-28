import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useTheme } from '../hooks'

interface ThemeObject {
  [themeName: string]: string | React.ReactElement
}

interface ColorProps extends React.HTMLAttributes<HTMLButtonElement> {
  themes?: ThemeObject
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
 *
 * @link https://maker-ui.com/docs/layout/color-button
 */
export const ColorButton = ({
  className,
  themes,
  children,
  ...props
}: ColorProps) => {
  const { theme: current, options: themeList, setColorTheme } = useTheme()

  // Never render this component if themes are undefined
  if (!themeList || themeList.length === 1) return null

  const cycleMode = () => {
    const i = themeList.indexOf(current as string)
    const next = themeList[(i + 1) % themeList.length]

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
  const themeContent = themes && current && themes[current]

  return <button {...attributes}>{themeContent ?? children ?? current}</button>
}

ColorButton.displayName = 'ColorButton'
