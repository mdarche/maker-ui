/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useRef, useLayoutEffect } from "react"

import { useOptions } from "../context/ElementsContext"
import { useMeasureState, useMeasureUpdater } from "../context/MeasureContext"

const Header = props => {
  const options = useOptions()
  const { topbarHeight } = useMeasureState()
  const setMeasurements = useMeasureUpdater()
  const headerRef = useRef(null)

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

  useLayoutEffect(() => {
    setMeasurements(state => ({
      ...state,
      headerHeight: headerRef.current.clientHeight,
    }))
  }, [setMeasurements])

  const stickyPartial = sticky
    ? {
        position: stickyMobile ? "sticky" : ["initial", "sticky"],
        top: options.topbar.sticky ? topbarHeight : 0,
      }
    : null

  const borderPartial = border
    ? { borderBottom: border }
    : { borderBottom: "1px solid", borderColor: "border" }

  return (
    <header
      ref={headerRef}
      sx={{
        bg: backgroundColor || "bg_header",
        boxShadow: boxShadow || "header",
        fontFamily: "heading",
        zIndex: 100,
        ...stickyPartial,
        ...borderPartial,
      }}>
      <div
        id="header-content"
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: justify || "flex-start",
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
  boxShadow: PropTypes.string,
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default Header
