/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useMenu } from "../context/UIContext"
import { ReactComponent as MenuIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"

const MenuToggle = props => {
  const [menuActive, toggleMenu] = useMenu()
  const { fill, height, children, icon = undefined, ...rest } = props

  // Partials

  const renderIcon = () => {
    return icon === "menu" ? <MenuIcon /> : <CloseIcon />
  }

  return (
    <button
      {...rest}
      aria-label="Mobile Menu Toggle"
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
      }}>
      {icon !== undefined ? renderIcon() : children}
    </button>
  )
}

MenuToggle.propTypes = {
  fill: PropTypes.string,
  icon: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
}

export default MenuToggle
