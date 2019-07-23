/** @jsx jsx */
import { jsx } from "theme-ui"
import { useRef, useLayoutEffect } from "react"
import { useOptions } from "../context/UIContext"
import { useMeasurements, measure } from "../context/MeasureContext"

const Header = props => {
  const options = useOptions()
  const { setHeaderHeight } = measure()
  const { topbarHeight } = useMeasurements()
  const { sticky, maxWidth, background } = props
  const headerRef = useRef(null)

  // Component Lifecycle

  useLayoutEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight)
  }, [])

  // Partials

  const stickyPartial =
    sticky || options.header.sticky
      ? {
          position: "sticky",
          top: options.topbar.sticky ? topbarHeight : 0,
          zIndex: 100,
        }
      : null

  return (
    <header
      ref={headerRef}
      sx={{
        bg: background || "bg_header",
        fontFamily: "nav",
        p: 3,
        boxShadow: "header",
        borderBottom: "header",
        ...stickyPartial,
      }}
    >
      <div
        {...props}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          m: "0 auto",
          width: "100%",
          maxWidth: maxWidth || "max_header",
        }}
      />
    </header>
  )
}

export default Header
