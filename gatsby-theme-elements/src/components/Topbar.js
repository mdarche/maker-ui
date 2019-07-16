/** @jsx jsx */
import { useRef, useLayoutEffect } from "react"
import { jsx } from "theme-ui"
import { useOptions } from "../context/UIContext"
import { measure } from "../context/MeasureContext"

const Topbar = props => {
  const { background, color, sticky, maxWidth } = props
  const options = useOptions().topbar
  const topbarRef = useRef(null)
  const { setTopbarHeight } = measure()

  useLayoutEffect(() => {
    setTopbarHeight(topbarRef.current.clientHeight)
  }, [])

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
        bg: background || "bg_topbar",
        fontFamily: "topbar" || "body",
        color: color || "topbar" || "body",
        zIndex: 100,
        overflowX: "scroll",
        ...stickyPartial,
      }}
    >
      <div
        sx={{
          m: "0 auto",
          maxWidth: maxWidth || "max_topbar",
        }}
        {...props}
      />
    </aside>
  )
}

export default Topbar
