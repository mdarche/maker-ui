/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const NavMenu = ({
  width,
  justify,
  flex,
  menuItems = [],
  children,
  ...props
}) => {
  const flexPartial = flex ? { flex: 1 } : null

  return (
    <nav
      id="nav-primary"
      aria-label="Primary Navigation Menu"
      sx={{
        display: ["none", "flex"],
        width: width || "auto",
        justifyContent: justify || "flex-start",
        ...flexPartial,
      }}>
      {children ? (
        children
      ) : (
        <ul
          {...props}
          id="menu-primary"
          role="menu"
          sx={{
            display: "flex",
            listStyle: "none",
          }}>
          {menuItems.map(({ label, path }) => (
            <li key={label}>
              {path.charAt(0) === "/" ? (
                <Link to={path} sx={{ variant: "navlink" }}>
                  {label}
                </Link>
              ) : (
                <a
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ variant: "navlink" }}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

NavMenu.propTypes = {
  flex: PropTypes.bool,
  justify: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  menuItems: PropTypes.array,
  children: PropTypes.node,
}

export default NavMenu
