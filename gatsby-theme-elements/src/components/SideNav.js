/** @jsx jsx */
import { jsx } from "theme-ui"
import { useRef, useLayoutEffect, useEffect } from "react"
import { measure, useMeasurements } from "../context/MeasureContext"
import { useOptions, useSideNav } from "../context/UIContext"
import { animated as a } from "react-spring"
import { spring } from "../utils/animate"

const SideNav = props => {
  const {
    style,
    children,
    boxShadow,
    backgroundColor,
    breakpoint = 750,
  } = props
  const [sideNavActive, toggleSideNav] = useSideNav()
  const options = useOptions().sideNav
  const { viewportX } = useMeasurements()
  const { setSideNavWidth } = measure()
  const sideNavRef = useRef(null)
  const width = props.width || options.width

  // Component Lifecyle

  useLayoutEffect(() => {
    setSideNavWidth(sideNavRef.current.clientWidth)
  }, [])

  useEffect(() => {
    if (sideNavActive && viewportX < breakpoint) {
      toggleSideNav(false)
    }
    if (!sideNavActive && viewportX > breakpoint) {
      toggleSideNav(true)
    }
  }, [viewportX])

  return (
    <a.section
      style={spring(sideNavActive, width, options.sideNavSpring)}
      ref={sideNavRef}
      aria-label="Secondary Navigation"
      sx={{
        width,
        position: "fixed",
        bg: backgroundColor || "bg_sidenav",
        boxShadow: boxShadow || ["1px 1px 8px 1px rgba(0, 0, 0, 0.1)", "none"],
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 10,
        overflowY: "scroll",
      }}
    >
      <div sx={{ ...style }}>{children}</div>
    </a.section>
  )
}

export default SideNav
