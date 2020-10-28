import React from 'react'
import { useThemeUI } from 'theme-ui'

import { Button } from './Primitives'
import { MaybeElement } from '../types'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface ColorButtonProps {
  custom: MaybeElement
}

export const ColorButton = ({ custom }: ColorButtonProps) => {
  const { theme, colorMode, setColorMode } = useThemeUI()
  const { header } = useOptions()

  const modes: string[] = theme.colors.modes
    ? [theme.initialColorModeName].concat(Object.keys(theme.colors.modes))
    : [theme.initialColorModeName]

  const cycleMode = (): void => {
    const i = modes.indexOf(colorMode)
    const next = modes[(i + 1) % modes.length]

    setColorMode(next)
  }

  if (modes.length === 1) {
    return null
  }

  return header.colorToggle ? (
    <Button
      title="Color Mode"
      className="color-toggle"
      aria-label="Toggle Color Mode"
      variant="header.colorButton"
      onClick={cycleMode}
      sx={{
        display: header.hideColorToggleOnMobile
          ? setBreakpoint(header.breakIndex, ['none', 'block'])
          : 'block',
      }}>
      {custom || colorMode}
    </Button>
  ) : null
}
