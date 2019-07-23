/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const NavMenu = props => {
  return (
    <ul
      {...props}
      aria-label="Main Navigation"
      role="menu"
      sx={{
        display: ["none", "flex"],
        listStyle: "none",
      }}
    />
  )
}

NavMenu.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NavMenu
