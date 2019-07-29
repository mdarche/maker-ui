/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const ColorToggle = ({ modes, children, ...props }) => {
  // const [color, setColor] = useColorMode()

  // const cycleMode = e => {
  //   const i = modes.indexOf(color)
  //   const next = modes[(i + 1) % modes.length]
  //   setColor(next)
  // }

  return (
    <button
      // onClick={() => setColor(color === "light" ? "dark" : "light")}
      {...props}>
      {children ? children : "test"}
    </button>
  )
}

ColorToggle.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
}

export default ColorToggle
