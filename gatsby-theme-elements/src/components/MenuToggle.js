/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactComponent as MenuIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { updateUI, getGlobals } from "../context/UIContext"

const MenuToggle = props => {
  const { fill, height, children, icon = undefined } = props
  const { toggleMenu } = updateUI()
  const { mobileActive } = getGlobals()

  const renderIcon = () => {
    return icon === "menu" ? <MenuIcon /> : <CloseIcon />
  }

  return (
    <button
      role="button"
      aria-label="Menu Toggle"
      aria-expanded={mobileActive ? "true" : "false"}
      aria-pressed={mobileActive ? "true" : "false"}
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
      {...props}
    >
      {children}
      {icon !== undefined ? renderIcon() : null}
    </button>
  )
}

export default MenuToggle
