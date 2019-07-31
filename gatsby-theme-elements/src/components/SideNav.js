/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { measure, useMeasurements } from "../context/MeasureContext"
import { useOptions, useSideNav } from "../context/UIContext"
import { animated as a } from "react-spring"
import { reveal } from "../utils/animate"

function getInnerWidth() {
  if (typeof window !== `undefined`) {
    return window.innerWidth
  }
}

// TODO Measure SideNav and update context

const SideNav = props => {
  const options = useOptions()
  const [sideNavActive, toggleSideNav] = useSideNav()

  const {
    viewportX,
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
    if (sideNavActive && viewportX < breakpoint) {
      toggleSideNav(false)
    }
    if (!sideNavActive && viewportX > breakpoint) {
      toggleSideNav(true)
    }
  }, [viewportX])

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

  return (
    <a.div
      style={reveal(sideNavActive, getInnerWidth(), breakpoint, width, spring)}
      aria-label="Secondary Navigation Menu"
      key="SideNav"
      sx={{
        width: width || "width_sideNav",
        position: "fixed",
        bg: backgroundColor || "bg_sidenav",
        boxShadow: boxShadow || ["1px 1px 8px 1px rgba(0, 0, 0, 0.1)", "none"],
        borderRight: border || "sidenav",
        maxWidth: "75vw",
        left: 0,
        bottom: 0,
        zIndex: [200, 10],
        overflowY: "scroll",
        ...topPartial(),
      }}>
      <nav {...rest} />
    </a.div>
  )
}

SideNav.propTypes = {
  backgroundColor: PropTypes.string,
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
