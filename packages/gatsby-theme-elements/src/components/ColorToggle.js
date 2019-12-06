/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import theme from "../config/base-theme"
import PropTypes from "prop-types"

const modes = theme.colors.modes
  ? [theme.initialColorMode].concat(Object.keys(theme.colors.modes))
  : [theme.initialColorMode]

const ColorToggle = ({ children, ...props }) => {
  const [color, setColor] = useColorMode()

  const cycleMode = () => {
    const i = modes.indexOf(color)
    const next = modes[(i + 1) % modes.length]

    setColor(next)
  }

  return (
    <button
      {...props}
      id="color-toggle"
      aria-label="Toggle Color Mode"
      onClick={cycleMode}>
      {children ? children : color}
    </button>
  )
}

ColorToggle.propTypes = {
  children: PropTypes.node,
}

export default ColorToggle
