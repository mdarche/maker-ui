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
    justify,
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
        boxShadow: boxShadow || "header",
        borderBottom: border || "header",
        zIndex: 100,
        ...stickyPartial,
      }}>
      <a
        href="#content"
        id="skip-navigation"
        class="screen-reader-text"
        sx={{
          clip: "rect(0px, 0px, 0px, 0px)",
          position: "absolute",
          height: "1px",
          width: "1px",
          overflow: "hidden",
        }}>
        Skip to Content
      </a>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: justify || "space-between",
          m: "0 auto",
          p: 3,
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
  justify: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default Header
