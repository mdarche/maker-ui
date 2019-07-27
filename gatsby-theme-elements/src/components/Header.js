/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useRef, useLayoutEffect } from "react"
import { useOptions } from "../context/UIContext"
import { useMeasurements, measure } from "../context/MeasureContext"

const Header = props => {
  const headerRef = useRef(null)
  const options = useOptions()
  const { setHeaderHeight } = measure()
  const { topbarHeight } = useMeasurements()
  const {
    sticky = options.header.sticky,
    stickyMobile = options.header.stickyMobile,
    maxWidth,
    backgroundColor,
    boxShadow,
    border,
    ...rest
  } = props

  // Component Lifecycle

  useLayoutEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight)
  }, [])

  // Partials

  const stickyPartial = sticky
    ? {
        position: stickyMobile ? "sticky" : ["initial", "sticky"],
        top: options.topbar.sticky ? topbarHeight : 0,
      }
    : null

  return (
    <header
      ref={headerRef}
      sx={{
        bg: backgroundColor || "bg_header",
        fontFamily: "nav",
        p: 3,
        boxShadow: boxShadow || "header",
        borderBottom: border || "header",
        zIndex: 100,
        ...stickyPartial,
      }}>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          m: "0 auto",
          maxWidth: maxWidth || "max_header",
        }}
        {...rest}
      />
    </header>
  )
}

Header.propTypes = {
  backgroundColor: PropTypes.string,
  sticky: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

export default Header
