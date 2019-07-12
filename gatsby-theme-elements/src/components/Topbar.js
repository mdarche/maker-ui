/** @jsx jsx */
import { useRef, useLayoutEffect } from "react"
import { jsx } from "theme-ui"
import { measure, getOptions } from "../context/UIContext"

const Topbar = props => {
  const options = getOptions().topBar
  const topBarRef = useRef(null)
  const { getTopBarHeight } = measure()

  useLayoutEffect(() => {
    getTopBarHeight(topBarRef.current.clientHeight)
  }, [])

  const stickyPartial = options.sticky
    ? {
        position: "sticky",
        top: 0,
      }
    : null

  return (
    <aside
      ref={topBarRef}
      sx={{
        display:
          !options.sticky && options.hideOnMobile ? ["none", "block"] : "block",
        p: 2,
        bg: "topbarBG",
        fontFamily: "body",
        color: "topbarText",
        zIndex: 100,
        overflowX: "scroll",
        ...stickyPartial,
      }}
      {...props}
    />
  )
}

export default Topbar
