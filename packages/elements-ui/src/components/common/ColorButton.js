import React from 'react'
import { useThemeUI, Box } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import setBreakpoint from '../../utils/set-breakpoint'

const ColorButton = ({ custom }) => {
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
    <Box
      as="button"
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
    </Box>
  )
}

export default ColorButton
