/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const NavMenu = ({ width, flex, ...rest }) => {
  const flexPartial = flex ? { flex: 1 } : null

  return (
    <nav
      aria-label="Main Navigation Menu"
      sx={{
        width: width || "auto",
        ...flexPartial,
      }}>
      <ul
        {...rest}
        role="menu"
        sx={{
          display: ["none", "flex"],
          listStyle: "none",
        }}
      />
    </nav>
  )
}

NavMenu.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

export default NavMenu
