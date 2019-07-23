/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactComponent as ExpandIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { useSideNav } from "../context/UIContext"

const MenuToggle = props => {
  const { height, icon, ...rest } = props
  const [sideNavActive, toggleSideNav] = useSideNav()

  const renderIcon = () => (sideNavActive ? <CloseIcon /> : <ExpandIcon />)

  return (
    <button
      {...rest}
      aria-label="Side Nav Toggle"
      aria-expanded={sideNavActive ? "true" : "false"}
      aria-pressed={sideNavActive ? "true" : "false"}
      aria-haspopup="true"
      onClick={() => toggleSideNav()}
      sx={{
        display: ["flex", "none"],
        alignItems: "center",
        justifyContent: "center",
        bg: "accent",
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
        ...props.style,
      }}
    >
      {icon ? renderIcon() : null}
    </button>
  )
}

export default MenuToggle
