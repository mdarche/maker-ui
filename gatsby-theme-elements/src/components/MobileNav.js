/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import { animated as a } from "react-spring"

import { useMenu, useOptions } from "../context/UIContext"
import { formatUnit } from "../utils/helper"
import { transitions } from "../utils/animate"
import MenuToggle from "./MenuToggle"

const MobileNav = props => {
  const menuRef = useRef(null)
  const options = useOptions()
  const [menuActive, toggleMenu] = useMenu()

  const {
    backgroundColor,
    fill,
    children,
    defaultClose = false,
    hiddenDesktop = true,
    width = formatUnit(options.header.mobileNavWidth),
    animation = options.header.mobileAnimation,
    spring = options.header.spring,
    ...rest
  } = props

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

  return transitions(menuActive, animation, width, spring).map(
    ({ item, key, props }) =>
      item && (
        <a.nav
          {...rest}
          ref={menuRef}
          style={props}
          key={key}
          aria-label="Mobile Navigation Menu"
          sx={{
            position: "fixed",
            top: 0,
            height: "100%",
            display: hiddenDesktop ? ["flex", "none"] : "flex",
            border: "none",
            maxWidth: "100%",
            zIndex: 1000,
            fontFamily: "header",
            bg: backgroundColor || "bg_mobilenav",
            ...positionPartial(),
          }}>
          {defaultClose ? (
            <MenuToggle
              icon="close"
              height={54}
              fill={fill}
              hiddenDesktop={hiddenDesktop}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                m: 20,
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
}

export default MobileNav
