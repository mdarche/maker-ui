/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactComponent as MenuIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { useMenu } from "../context/UIContext"

const MenuToggle = props => {
  const { fill, height, children, icon = undefined } = props
  const [menuActive, toggleMenu] = useMenu()

  // Partials

  const renderIcon = () => {
    return icon === "menu" ? <MenuIcon /> : <CloseIcon />
  }

  return (
    <button
      {...props}
      aria-label="Menu Toggle"
      aria-expanded={menuActive ? "true" : "false"}
      aria-pressed={menuActive ? "true" : "false"}
      aria-haspopup="true"
      onClick={() => toggleMenu()}
      sx={{
        display: ["flex", "none"],
        border: "none",
        background: "none",
        svg: {
          fill: fill,
          height: height || 32,
        },
      }}
    >
      {children}
      {icon !== undefined ? renderIcon() : null}
    </button>
  )
}

export default MenuToggle
