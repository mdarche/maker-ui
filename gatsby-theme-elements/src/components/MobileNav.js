/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import { animated as a } from "react-spring"
import { useMenu, useOptions } from "../context/UIContext"
import { formatUnit } from "../utils/helper"
import { transitions } from "../utils/animate"
import MenuToggle from "./MenuToggle"

const MobileNav = ({
  backgroundColor,
  children,
  defaultClose = false,
  ...props
}) => {
  const menuRef = useRef(null)
  const options = useOptions()
  const [menuActive, toggleMenu] = useMenu()

  const width =
    formatUnit(props.width) || formatUnit(options.header.mobileNavWidth)
  const animation = props.animation || options.header.mobileNavStyle
  const config = props.spring || options.header.spring

  // Component Lifecyle

  useEffect(() => {
    if (menuActive && !animation.startsWith("fade")) {
      document.addEventListener("mousedown", handleClick)
    }
    return () => document.removeEventListener("mousedown", handleClick)
  }, [menuActive])

  // Event Handlers

  const handleClick = e => {
    return menuRef.current.contains(e.target) ? null : toggleMenu(false)
  }

  // Partials

  const positionPartial = () => {
    if (animation.startsWith("fade")) {
      return { left: 0, width: "100%" }
    }

    return animation === "slideRight" ? { left: 0, width } : { right: 0, width }
  }

  return transitions(menuActive, animation, width, config).map(
    ({ item, key, props }) =>
      item && (
        <a.nav
          {...props}
          ref={menuRef}
          style={props}
          key={key}
          aria-label="Mobile Navigation Menu"
          sx={{
            position: "fixed",
            top: 0,
            height: "100%",
            display: ["flex", "none"],
            border: "none",
            maxWidth: "100%",
            zIndex: 1000,
            fontFamily: "header",
            bg: backgroundColor || "bg_navmobile",
            ...positionPartial(),
          }}>
          {defaultClose ? (
            <MenuToggle
              icon="close"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                m: 20,
                svg: { fill: "#fff", height: 54 },
              }}
            />
          ) : null}
          {children}
        </a.nav>
      )
  )
}

MobileNav.propTypes = {
  backgroundColor: PropTypes.string,
  defaultClose: PropTypes.bool,
  animation: PropTypes.string,
  spring: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node,
}

export default MobileNav
