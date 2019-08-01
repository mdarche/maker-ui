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
      <ul
        {...props}
        id="menu-primary"
        role="menu"
        sx={{
          display: "flex",
          listStyle: "none",
        }}>
        {children
          ? children
          : menuItems.map(({ label, path, target = "_self" }) => (
              <li key={label}>
                {path.charAt(0) === "/" ? (
                  <Link
                    to={path}
                    sx={{
                      variant: "textStyles.navlink",
                      whiteSpace: "nowrap",
                    }}>
                    {label}
                  </Link>
                ) : (
                  <a
                    href={path}
                    target={target}
                    sx={{
                      variant: "textStyles.navlink",
                      whiteSpace: "nowrap",
                    }}>
                    {label}
                  </a>
                )}
              </li>
            ))}
      </ul>
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
  children: PropTypes.node,
}

export default NavMenu
