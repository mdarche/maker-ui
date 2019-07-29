/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import PropTypes from "prop-types"

const ColorToggle = ({ modes, children, ...props }) => {
  const [color, setColor] = useColorMode()

  const cycleMode = () => {
    const i = modes.indexOf(color)
    const next = modes[(i + 1) % modes.length]
    setColor(next)
  }

  return (
    <button onClick={cycleMode} {...props}>
      {children ? children : color}
    </button>
  )
}

ColorToggle.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
}

export default ColorToggle
