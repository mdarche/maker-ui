/** @jsx jsx */
import { jsx } from "theme-ui"

const WidgetArea = props => {
  const { maxWidth, background, gridGap, children } = props
  const columns = Array.isArray(children) ? children.length : 1
  const gap = gridGap ? { gridGap } : { variant: "gaps.widgetGap" }

  console.log("gap is", gap)

  return (
    <div
      {...props}
      sx={{
        m: "0 auto 20px",
        width: "100%",
        bg: background || "bg_footer",
        maxWidth: maxWidth || "max_footer",
        display: columns > 1 ? "grid" : "block",
        gridTemplateColumns: ["1fr", `repeat(${columns}, 1fr)`],
        ...gap,
      }}
    />
  )
}

export default WidgetArea
