import React from "react"
import { useThemeUI, Box } from "theme-ui"

const ColorButton = ({ custom }) => {
  const { theme, colorMode, setColorMode } = useThemeUI()

  const modes = theme.colors.modes
    ? [theme.initialColorModeName].concat(Object.keys(theme.colors.modes))
    : [theme.initialColorModeName]

  const cycleMode = () => {
    const i = modes.indexOf(colorMode)
    const next = modes[(i + 1) % modes.length]

    setColorMode(next)
  }

  return modes.length === 1 ? null : (
    <Box
      as="button"
      title="Color Mode"
      id="color-toggle"
      aria-label="Toggle Color Mode"
      variant="header.colorButton"
      onClick={cycleMode}>
      {custom || colorMode}
    </Box>
  )
}

export default ColorButton
