/** @jsx jsx */
import { jsx } from "theme-ui"
import { useEffect, useRef } from "react"
import { useMenu, useOptions } from "../context/UIContext"
import { styleUnit } from "../utils/helper"
import { animated as a } from "react-spring"
import { transitions } from "../utils/animate"
import MenuToggle from "./MenuToggle"

const MobileNav = props => {
  const { background, children, defaultClose = false } = props
  const [menuActive, toggleMenu] = useMenu()
  const options = useOptions().header
  const menuRef = useRef(null)
  const width = styleUnit(props.width) || styleUnit(options.mobileNavWidth)
  const animation = props.animation || options.mobileNavStyle

  // Close Menu when user clicks off div
  useEffect(() => {
    if (menuActive && !animation.startsWith("fade")) {
      document.addEventListener("mousedown", handleClick)
    }
    return () => document.removeEventListener("mousedown", handleClick)
  }, [menuActive])

  const handleClick = e => {
    if (menuRef.current.contains(e.target)) {
      return
    }
    return toggleMenu(false)
  }

  const positionPartial = () => {
    if (animation.startsWith("fade")) {
      return { left: 0, width: "100%" }
    }
    return animation === "slideRight" ? { left: 0, width } : { right: 0, width }
  }

  return transitions(menuActive, animation, width, options.mobileNavSpring).map(
    ({ item, key, props }) =>
      item && (
        <a.div
          {...props}
          ref={menuRef}
          style={props}
          key={key}
          sx={{
            zIndex: 1000,
            position: "fixed",
            top: 0,
            height: "100%",
            display: ["flex", "none"],
            border: "none",
            maxWidth: "100%",
            bg: background || "bg_navmobile",
            ...positionPartial(),
          }}
        >
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
        </a.div>
      )
  )
}

export default MobileNav
