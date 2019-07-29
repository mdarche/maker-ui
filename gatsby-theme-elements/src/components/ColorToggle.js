/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import PropTypes from "prop-types"
import theme from "../gatsby-plugin-theme-ui"

const modes = [theme.initialColorMode].concat(Object.keys(theme.colors.modes))

const ColorToggle = ({ children, ...props }) => {
  const [color, setColor] = useColorMode()

  const cycleMode = () => {
    const i = modes.indexOf(color)
    const next = modes[(i + 1) % modes.length]
    setColor(next)
  }

  return (
    <button id="color-toggle" onClick={cycleMode} {...props}>
      {children ? children : color}
    </button>
  )
}

ColorToggle.propTypes = {
  children: PropTypes.node,
}

export default ColorToggle
