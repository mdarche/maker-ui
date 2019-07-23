/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useRef, useLayoutEffect, useEffect } from "react"
import { useOptions } from "../context/UIContext"
import { measure } from "../context/MeasureContext"

const Topbar = props => {
  const { backgroundColor, color, sticky, maxWidth, ...rest } = props
  const { setTopbarHeight } = measure()
  const options = useOptions().topbar
  const topbarRef = useRef(null)

  // Component Lifecycle

  useLayoutEffect(() => {
    setTopbarHeight(topbarRef.current.clientHeight)
  }, [])

  // TODO finish this update UI context and test. Check Header.js too

  // useEffect(() => {
  //   return sticky && sticky !== options.sticky
  //     ? console.log("Update context")
  //     : null
  // }, [])

  // Partials

  const stickyPartial =
    sticky || options.sticky
      ? {
          position: "sticky",
          top: 0,
        }
      : null

  return (
    <aside
      ref={topbarRef}
      sx={{
        display:
          !options.sticky && options.hideOnMobile ? ["none", "block"] : "block",
        p: 2,
        bg: backgroundColor || "bg_topbar",
        fontFamily: "topbar" || "body",
        color: color || "text_topbar",
        zIndex: 100,
        overflowX: "scroll",
        ...stickyPartial,
      }}
    >
      <div
        {...rest}
        sx={{
          m: "0 auto",
          maxWidth: maxWidth || "max_topbar",
        }}
      />
    </aside>
  )
}

Topbar.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  sticky: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

export default Topbar
