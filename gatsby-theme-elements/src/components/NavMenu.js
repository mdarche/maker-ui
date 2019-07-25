/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const NavMenu = props => (
  <nav aria-label="Main Navigation">
    <ul
      {...props}
      role="menu"
      sx={{
        display: ["none", "flex"],
        listStyle: "none",
      }}
    />
  </nav>
)

NavMenu.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NavMenu
