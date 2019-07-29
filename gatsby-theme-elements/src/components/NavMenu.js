/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const NavMenu = ({ width, justify, flex, ...rest }) => {
  const flexPartial = flex ? { flex: 1 } : null

  return (
    <nav
      aria-label="Main Navigation Menu"
      sx={{
        display: ["none", "flex"],
        width: width || "auto",
        justifyContent: justify || "flex-start",
        ...flexPartial,
      }}>
      <ul
        {...rest}
        role="menu"
        sx={{
          display: "flex",
          listStyle: "none",
        }}
      />
    </nav>
  )
}

NavMenu.propTypes = {
  justify: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default NavMenu
