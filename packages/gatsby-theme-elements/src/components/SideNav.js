/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import { animated as a } from "react-spring"

import { measure, useMeasurements } from "../context/MeasureContext"
import { useOptions, useSideNav, useLayout } from "../context/UIContext"
import { reveal } from "../utils/animate"

function getInnerWidth() {
  if (typeof window !== `undefined`) {
    return window.innerWidth
  }
}

const SideNav = props => {
  const sideNavRef = useRef(null)
  const options = useOptions()
  const [sideNavActive, toggleSideNav] = useSideNav()
  const [layout] = useLayout()
  const side = layout === "sidenav-content" ? "left" : "right"

  const {
    viewportWidth,
    topbarHeight,
    headerHeight,
    sideNavWidth,
  } = useMeasurements()
  const { setSideNavWidth } = measure()

  const breakpoint = options.breakpoints.sm
  const {
    boxShadow,
    backgroundColor,
    border,
    top = 0,
    width = options.sideNav.width,
    spring = options.sideNav.spring,
    ...rest
  } = props

  // Component Lifecyle

  useEffect(() => {
    if (width !== sideNavWidth) {
      setSideNavWidth(width)
    }
    if (sideNavActive && viewportWidth < breakpoint) {
      toggleSideNav(false)
    }
    if (!sideNavActive && viewportWidth > breakpoint) {
      toggleSideNav(true)
    }
  }, [viewportWidth])

  // Partials

  const topPartial = () => {
    const { topbar, header } = options
    const totalHeight = topbarHeight + headerHeight

    if (
      (topbar.sticky && header.sticky) ||
      (!topbar.sticky && !header.sticky)
    ) {
      return { top: [0, totalHeight] }
    }

    return { top }
  }

  const positionPartial =
    side === "left"
      ? { left: 0, borderRight: border || "1px solid" }
      : { right: 0, borderLeft: border || "1px solid" }

  return (
    <a.section
      ref={sideNavRef}
      style={reveal(
        sideNavActive,
        getInnerWidth(),
        breakpoint,
        width,
        side,
        spring
      )}
      aria-label="Secondary Navigation Menu"
      key="SideNav"
      sx={{
        width: width || "width_sideNav",
        position: "fixed",
        bg: backgroundColor || "bg_sidenav",
        boxShadow: boxShadow || ["1px 1px 8px 1px rgba(0, 0, 0, 0.1)", "none"],
        maxWidth: "75vw",
        bottom: 0,
        opacity: sideNavActive ? [1, 1] : [0, 1],
        zIndex: [200, 10],
        overflowY: "scroll",
        ...topPartial(),
        ...positionPartial,
        borderColor: "border",
      }}>
      <nav {...rest} />
    </a.section>
  )
}

SideNav.propTypes = {
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  spring: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  boxShadow: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.node.isRequired,
}

export default SideNav
