/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import PropTypes from "prop-types"

import { useMenu } from "../context/UIContext"
import { ReactComponent as MenuIcon } from "../assets/menu.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import theme from "../config/base-theme"

const MenuToggle = ({ fill, height, children, icon, ...props }) => {
  const [color] = useColorMode()
  const [menuActive, toggleMenu] = useMenu()

  const fillColor =
    color !== theme.initialColorMode
      ? theme.colors.modes[color].navlink
      : theme.colors.navlink

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
        border: "none",
        background: "none",
        svg: {
          fill: fill || fillColor,
          height: height || 32,
        },
      }}>
      {children ? children : renderIcon()}
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
