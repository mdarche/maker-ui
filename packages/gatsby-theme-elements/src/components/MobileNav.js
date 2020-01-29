/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import { animated as a, useTransition } from "react-spring"

import { useOptions, useMenu } from "../context/ElementsContext"
import { formatUnit } from "../utils/helper"
import { transitionTypes } from "../utils/animate"
import MenuToggle from "./MenuToggle"

const MobileNav = props => {
  const menuRef = useRef(null)
  const options = useOptions().header
  const [menuActive, toggleMenu] = useMenu()

  const {
    backgroundColor,
    fill,
    children,
    defaultClose = false,
    hiddenDesktop = true,
    width = formatUnit(options.mobileNavWidth),
    animation = options.mobileAnimation,
    spring = options.spring,
    ...rest
  } = props

  useEffect(() => {
    const handleClick = e => {
      return menuRef.current.contains(e.target) ? null : toggleMenu(false)
    }

    if (menuActive && !animation.startsWith("fade")) {
      document.addEventListener("mousedown", handleClick)
    }
    return () => document.removeEventListener("mousedown", handleClick)
  }, [menuActive, toggleMenu, animation, menuRef])

  const positionPartial = () => {
    if (animation.startsWith("fade")) {
      return { left: 0, width: "100%" }
    }

    return animation === "slideRight" ? { left: 0, width } : { right: 0, width }
  }

  const transitions = useTransition(menuActive, null, {
    ...transitionTypes(width, animation),
    spring,
  })

  return transitions.map(
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
