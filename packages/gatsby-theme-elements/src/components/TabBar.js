/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const TabBar = ({
  backgroundColor,
  menuItems,
  border,
  boxShadow,
  children,
  ...props
}) => {
  const borderPartial = border
    ? { borderTop: border }
    : { borderTop: "1px solid", borderColor: "border" }

  return (
    <div
      aria-label="Mobile Navigation"
      {...props}
      sx={{
        display: ["block", "none"],
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: "scroll",
        p: 2,
        zIndex: 1,
        bg: backgroundColor || "bg_tabbar",
        boxShadow: boxShadow || "tabbar",
        ...borderPartial,
      }}>
      {children ? (
        children
      ) : (
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${menuItems.length}, 1fr)`,
            columnGap: 20,
          }}>
          {menuItems.map(({ label, alt, path, icon }) => {
            return path.charAt(0) === "/" ? (
              <Link key={label} to={path} sx={{ variant: "tablink" }}>
                {icon}
                {alt ? alt : label}
              </Link>
            ) : (
              <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ variant: "tablink" }}>
                {icon}
                {alt ? alt : label}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

TabBar.propTypes = {
  backgroundColor: PropTypes.string,
  boxShadow: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.node,
  menuItems: PropTypes.array,
}

export default TabBar
