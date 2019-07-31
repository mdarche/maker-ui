/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import { ReactComponent as LogoMark } from "../logo.svg"

const Logo = ({
  path = "/",
  height = "30px",
  fill,
  colorMode = false,
  colorOptions,
  children,
  ...props
}) => {
  const [color] = useColorMode()

  const colorPartial = () => {
    if (fill) {
      return { svg: { fill } }
    }
    if (colorMode) {
      return { svg: { fill: "logo" } }
    }
    if (colorOptions) {
      return colorOptions.hasOwnProperty(color) ? colorOptions[color] : null
    }
    return null
  }

  return (
    <Link
      {...props}
      to={path}
      id="logo"
      aria-label="Back to home page"
      sx={{ display: "flex", ...colorPartial() }}>
      {children ? children : <LogoMark sx={{ height }} />}
    </Link>
  )
}

Logo.propTypes = {
  path: PropTypes.string,
  fill: PropTypes.string,
  colorMode: PropTypes.bool,
  colorOptions: PropTypes.object,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node,
}

export default Logo
