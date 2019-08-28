/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

import { useSideNav, useLayout } from "../context/UIContext"
import { ReactComponent as ExpandIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"

const SideNavToggle = ({
  height,
  defaultIcon = false,
  backgroundColor,
  color,
  children,
  ...props
}) => {
  const [sideNavActive, toggleSideNav] = useSideNav()
  const [layout] = useLayout()

  const renderIcon = () => (sideNavActive ? <CloseIcon /> : <ExpandIcon />)

  const positionPartial =
    layout === "sidenav-content" ? { right: 20 } : { left: 20 }

  return (
    <button
      aria-label="Side Navigation Toggle"
      aria-expanded={sideNavActive ? "true" : "false"}
      aria-pressed={sideNavActive ? "true" : "false"}
      aria-haspopup="true"
      onClick={() => toggleSideNav()}
      sx={{
        position: "fixed",
        display: ["flex", "none"],
        alignItems: "center",
        justifyContent: "center",
        bg: backgroundColor || "accent",
        border: "none",
        boxShadow: "1px 1px 4px 1px rgba(0, 0, 0, 0.2)",
        color: color || "#fff",
        height: height || 60,
        width: height || 60,
        bottom: 25,
        ...positionPartial,
        svg: {
          fill: color || "#fff",
          height: 36,
        },
      }}
      {...props}>
      {defaultIcon ? renderIcon() : children}
    </button>
  )
}

SideNavToggle.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  defaultIcon: PropTypes.bool,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node,
}

export default SideNavToggle
