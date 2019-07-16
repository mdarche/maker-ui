/** @jsx jsx */
import { useRef, useLayoutEffect } from "react"
import { jsx } from "theme-ui"
import { useOptions } from "../context/UIContext"
import { measure } from "../context/MeasureContext"

const Topbar = props => {
  const { background, color, sticky, maxWidth } = props
  const { setTopbarHeight } = measure()
  const options = useOptions().topbar
  const topbarRef = useRef(null)

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
        {...props}
        sx={{
          m: "0 auto",
          maxWidth: maxWidth || "max_topbar",
        }}
      />
    </aside>
  )
}

export default Topbar
