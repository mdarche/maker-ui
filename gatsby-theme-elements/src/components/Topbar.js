/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useRef, useLayoutEffect, useEffect } from "react"

import { useOptions, useTopbar } from "../context/UIContext"
import { measure } from "../context/MeasureContext"

const Topbar = ({
  backgroundColor,
  border,
  color,
  sticky,
  maxWidth,
  ...props
}) => {
  const topbarRef = useRef(null)
  const options = useOptions()
  const setTopbar = useTopbar()
  const { setTopbarHeight } = measure()

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

  const borderPartial = border ? { borderBottom: border } : null

  return (
    <aside
      ref={topbarRef}
      sx={{
        display:
          !options.topbar.sticky && options.topbar.hideOnMobile
            ? ["none", "block"]
            : "block",
        bg: backgroundColor || "bg_topbar",
        zIndex: 100,
        ...borderPartial,
        ...stickyPartial,
      }}>
      <div
        {...props}
        sx={{
          m: "0 auto",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          color: color || "text_topbar",
          maxWidth: maxWidth || "max_topbar",
          p: 2,
        }}
      />
    </aside>
  )
}

Topbar.propTypes = {
  backgroundColor: PropTypes.string,
  sticky: PropTypes.bool,
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default Topbar
