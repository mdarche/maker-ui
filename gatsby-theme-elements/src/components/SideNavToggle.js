/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactComponent as ExpandIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { useSideNav } from "../context/UIContext"

// TODO - media query for breakpoint to show / hide
// TODO - remove props and open up to custom sx styles
const MenuToggle = props => {
  const {
    fill,
    height,
    background,
    border,
    boxShadow,
    borderRadius,
    bottom,
    right,
    style,
    children,
    defaultIcon = false,
  } = props
  const [sideNavActive, toggleSideNav] = useSideNav()

  // Partials

  function renderIcon() {
    return sideNavActive ? <CloseIcon /> : <ExpandIcon />
  }

  return (
    <button
      aria-label="Side Nav Toggle"
      aria-expanded={sideNavActive ? "true" : "false"}
      aria-pressed={sideNavActive ? "true" : "false"}
      aria-haspopup="true"
      onClick={() => toggleSideNav()}
      sx={{
        display: ["flex", "none"],
        alignItems: "center",
        justifyContent: "center",
        bg: background || "accent",
        border: border || "none",
        borderRadius: borderRadius || "50%",
        boxShadow: boxShadow || "1px 1px 4px 1px rgba(0, 0, 0, 0.33)",
        height: height || 60,
        width: height || 60,
        position: "fixed",
        bottom: bottom || 25,
        right: right || 25,
        svg: {
          fill: fill || "#fff",
          height: height || 36,
        },
        ...style,
      }}
    >
      {defaultIcon ? renderIcon() : null}
      {children}
    </button>
  )
}

export default MenuToggle
