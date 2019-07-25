/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { ReactComponent as ExpandIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { useSideNav } from "../context/UIContext"

const SideNavToggle = props => {
  const [sideNavActive, toggleSideNav] = useSideNav()
  const { height, icon = false, backgroundColor, children, ...rest } = props

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
        height: height || 60,
        width: height || 60,
        position: "fixed",
        bottom: 25,
        right: 25,
        svg: {
          fill: "#fff",
          height: 36,
        },
      }}
      {...rest}
    >
      {icon ? renderIcon() : children}
    </button>
  )
}

SideNavToggle.propTypes = {
  backgroundColor: PropTypes.string,
  icon: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default SideNavToggle
