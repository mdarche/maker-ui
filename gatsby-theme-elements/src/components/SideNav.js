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

// TODO - mention known top issue in docs

const SideNav = props => {
  const sideNavRef = useRef(null)
  const options = useOptions()
  const { setSideNavWidth } = measure()
  const { viewportX, topbarHeight, headerHeight } = useMeasurements()
  const [sideNavActive, toggleSideNav] = useSideNav()
  const { boxShadow, backgroundColor, spring, top, ...rest } = props

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

  // Partials

  const topPartial = () => {
    const totalHeight = topbarHeight + headerHeight
    const { topbar, header } = options

    if (top !== undefined) {
      return { top }
    }

    if (
      (topbar.sticky && header.sticky) ||
      (!topbar.sticky && !header.sticky)
    ) {
      return { top: [0, totalHeight] }
    }

    return { top: 0 }
  }

  return (
    <a.section
      style={reveal(sideNavActive, getInnerWidth(), breakpoint, width, config)}
      ref={sideNavRef}
      aria-label="Secondary Navigation Menu"
      sx={{
        width,
        position: "fixed",
        bg: backgroundColor || "bg_sidenav",
        boxShadow: boxShadow || ["1px 1px 8px 1px rgba(0, 0, 0, 0.1)", "none"],
        maxWidth: "75vw",
        left: 0,
        bottom: 0,
        zIndex: [200, 10],
        overflowY: "scroll",
        ...topPartial(),
      }}>
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
