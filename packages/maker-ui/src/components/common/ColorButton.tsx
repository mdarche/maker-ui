import React from 'react'
import { useThemeUI } from 'theme-ui'

import { Button } from './Box'
import { MaybeElement } from '../props'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface ButtonProps {
  custom: MaybeElement
}

export const ColorButton = ({ custom }: ButtonProps) => {
  const { theme, colorMode, setColorMode } = useThemeUI()
  const { header } = useOptions()

  const modes = theme.colors.modes
    ? [theme.initialColorModeName].concat(Object.keys(theme.colors.modes))
    : [theme.initialColorModeName]

  const cycleMode = () => {
    const i = modes.indexOf(colorMode)
    const next = modes[(i + 1) % modes.length]

    setColorMode(next)
  }

  return modes.length === 1 && header.colorToggle ? null : (
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
  )
}
