/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import LogoMark from "../logo.js"

const Logo = ({
  path = "/",
  height = "30px",
  colorOptions,
  children,
  ...props
}) => {
  const [color] = useColorMode()

  const colorPartial = () => {
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
      {children ? children : <LogoMark sx={{ height, width: "auto" }} />}
    </Link>
  )
}

Logo.propTypes = {
  path: PropTypes.string,
  colorOptions: PropTypes.object,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node,
}

export default Logo
