/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import PropTypes from "prop-types"

import { useMenu } from "../context/UIContext"
import { MenuIcon, CloseIcon } from "../assets"
import theme from "../config/base-theme"

const MenuToggle = ({
  fill,
  height,
  children,
  icon,
  menuText,
  hiddenDesktop = true,
  ...props
}) => {
  const [color] = useColorMode()
  const [menuActive, toggleMenu] = useMenu()

  const fillColor =
    color !== theme.initialColorMode && theme.colors.modes[color].navlink
      ? theme.colors.modes[color].navlink
      : theme.colors.navlink

  const renderIcon = () => (
    <div sx={{ display: "flex" }}>
      {icon === "menu" ? <MenuIcon /> : <CloseIcon />}
      {menuText ? <span>{menuText}</span> : null}
    </div>
  )

  // TODO - Test this new menuText prop

  return (
    <button
      {...props}
      aria-label="Mobile Menu Toggle"
      aria-expanded={menuActive ? "true" : "false"}
      aria-pressed={menuActive ? "true" : "false"}
      aria-haspopup="true"
      onClick={() => toggleMenu()}
      sx={{
        display: hiddenDesktop ? ["flex", "none"] : "flex",
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
