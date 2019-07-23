/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useRef, useLayoutEffect, useEffect } from "react"
import { measure, useMeasurements } from "../context/MeasureContext"
import { useOptions, useSideNav } from "../context/UIContext"
import { animated as a } from "react-spring"
import { reveal } from "../utils/animate"

function getInnerWidth() {
  if (typeof window !== `undefined`) {
    return window.innerWidth
  }
}

const SideNav = props => {
  const { boxShadow, backgroundColor, spring, ...rest } = props
  const [sideNavActive, toggleSideNav] = useSideNav()
  const options = useOptions()
  const { viewportX } = useMeasurements()
  const { setSideNavWidth } = measure()
  const sideNavRef = useRef(null)

  const config = spring || options.sideNav.spring
  const width = props.width || options.sideNav.width
  const breakpoint = options.breakpoints.sm

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
      style={reveal(sideNavActive, getInnerWidth(), breakpoint, width, config)}
      ref={sideNavRef}
      aria-label="Secondary Navigation"
      sx={{
        width,
        position: "fixed",
        bg: backgroundColor || "bg_sidenav",
        boxShadow: boxShadow || ["1px 1px 8px 1px rgba(0, 0, 0, 0.1)", "none"],
        maxWidth: "75vw",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 10,
        overflowY: "scroll",
      }}
    >
      <div {...rest} />
    </a.section>
  )
}

SideNav.propTypes = {
  backgroundColor: PropTypes.string,
  spring: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  boxShadow: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default SideNav
