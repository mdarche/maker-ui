/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useRef, useLayoutEffect, useEffect } from "react"
import { useOptions, useTopbar } from "../context/UIContext"
import { measure } from "../context/MeasureContext"

const Topbar = props => {
  const topbarRef = useRef(null)
  const options = useOptions()
  const setTopbar = useTopbar()
  const { setTopbarHeight } = measure()
  const { backgroundColor, color, sticky, maxWidth, padding, ...rest } = props

  // Component Lifecycle

  useLayoutEffect(() => {
    setTopbarHeight(topbarRef.current.clientHeight)
  }, [])

  useEffect(() => {
    if (sticky !== undefined && sticky !== options.topbar.sticky) {
      setTopbar(sticky)
    }
  }, [])

  // Partials

  const stickyPartial = options.topbar.sticky
    ? {
        position: "sticky",
        top: 0,
        zIndex: 101,
      }
    : null

  return (
    <aside
      ref={topbarRef}
      sx={{
        display:
          !options.topbar.sticky && options.topbar.hideOnMobile
            ? ["none", "block"]
            : "block",
        bg: backgroundColor || "bg_topbar",
        color: color || "#fff",
        fontFamily: "topbar" || "body",
        zIndex: 100,
        overflowX: "scroll",
        ...stickyPartial,
      }}>
      <div
        {...rest}
        sx={{
          m: "0 auto",
          maxWidth: maxWidth || "max_topbar",
          p: padding || 2,
        }}
      />
    </aside>
  )
}

Topbar.propTypes = {
  backgroundColor: PropTypes.string,
  sticky: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

export default Topbar
