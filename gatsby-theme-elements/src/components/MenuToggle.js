/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactComponent as MenuIcon } from "../assets/menu.svg"
import { updateUI } from "../context/UIContext"

const MenuToggle = props => {
  const { fill, height, children } = props
  const { toggleMenu } = updateUI()

  return (
    <button
      role="button"
      aria-label="Menu Toggle"
      // aria-expanded={showMobile ? "true" : "false"}
      // aria-pressed={showMobile ? "true" : "false"}
      aria-haspopup="true"
      onClick={() => toggleMenu()}
      sx={{
        display: ["flex", "none"],
        border: "none",
        background: "none",
      }}
      {...props}
    >
      {children ? (
        children
      ) : (
        <MenuIcon
          sx={{
            fill: fill,
            height: height || 32,
          }}
        />
      )}
    </button>
  )
}

export default MenuToggle
