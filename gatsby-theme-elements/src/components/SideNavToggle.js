/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { ReactComponent as ExpandIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { useSideNav } from "../context/UIContext"

const SideNavToggle = props => {
  const [sideNavActive, toggleSideNav] = useSideNav()
  const {
    height,
    defaultIcon = false,
    backgroundColor,
    color,
    children,
    ...rest
  } = props

  const renderIcon = () => (sideNavActive ? <CloseIcon /> : <ExpandIcon />)

  return (
    <button
      aria-label="Side Navigation Toggle"
      aria-expanded={sideNavActive ? "true" : "false"}
      aria-pressed={sideNavActive ? "true" : "false"}
      aria-haspopup="true"
      onClick={() => toggleSideNav()}
      sx={{
        display: ["flex", "none"],
        alignItems: "center",
        justifyContent: "center",
        bg: backgroundColor || "accent",
        border: "none",
        boxShadow: "1px 1px 4px 1px rgba(0, 0, 0, 0.33)",
        color: color || "#fff",
        height: height || 60,
        width: height || 60,
        position: "fixed",
        bottom: 25,
        right: 20,
        svg: {
          fill: "#fff",
          height: 36,
        },
      }}
      {...rest}>
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
