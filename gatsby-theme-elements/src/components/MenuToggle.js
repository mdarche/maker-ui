/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

import { useMenu } from "../context/UIContext"
import { ReactComponent as MenuIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"

const MenuToggle = ({ fill, height, children, icon, ...props }) => {
  const [menuActive, toggleMenu] = useMenu()

  const renderIcon = () => {
    return icon === "menu" ? <MenuIcon /> : <CloseIcon />
  }

  return (
    <button
      {...props}
      aria-label="Mobile Menu Toggle"
      aria-expanded={menuActive ? "true" : "false"}
      aria-pressed={menuActive ? "true" : "false"}
      aria-haspopup="true"
      onClick={() => toggleMenu()}
      sx={{
        display: ["flex", "none"],
        svg: {
          fill: fill || "text_navlink",
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
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node,
}

export default MenuToggle
