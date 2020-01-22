import React from "react"
import { useThemeUI } from "theme-ui"
import { Box } from "@theme-ui/components"

const ColorButton = ({ custom }) => {
  const { theme, colorMode, setColorMode } = useThemeUI()

  const modes = theme.colors.modes
    ? [theme.initialColorMode].concat(Object.keys(theme.colors.modes))
    : [theme.initialColorMode]

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
      onClick={cycleMode}>
      {custom || colorMode}
    </Box>
  )
}

export default ColorButton
