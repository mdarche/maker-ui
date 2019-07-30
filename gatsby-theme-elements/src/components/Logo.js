/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const Logo = ({ path = "/", flex = false, height, children, ...props }) => {
  return (
    <Link {...props} to={path} id="logo">
      {children ? (
        children
      ) : (
        <div sx={{ height: 45, width: 230, bg: "gainsboro" }} />
      )}
    </Link>
  )
}

export default Logo
