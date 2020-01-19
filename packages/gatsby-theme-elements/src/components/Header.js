import React from "react"
import PropTypes from "prop-types"
import { useRef, useLayoutEffect } from "react"
import { Header as ElementsHeader } from "elements-ui"

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
    maxWidth = "max-header",
    backgroundColor = "bg_header",
    boxShadow = "header",
    justify = "flex-start",
    border = "1px solid",
    borderColor = "border",
    sx,
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

  return (
    <ElementsHeader
      ref={headerRef}
      bg={backgroundColor}
      boxShadow={boxShadow}
      borderBottom={border}
      borderColor={borderColor}
      stickyHeader={{ stickyPartial }}
      sx={{
        justifyContent: justify,
        maxWidth,
        p: 3,
        ...sx,
      }}
      {...props}
    />
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
