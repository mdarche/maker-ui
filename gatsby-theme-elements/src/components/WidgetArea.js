/** @jsx jsx */
import { jsx } from "theme-ui"

const WidgetArea = props => {
  const { maxWidth, background, columnGap } = props
  const columns = props.children.length

  return (
    <div
      {...props}
      sx={{
        m: "0 auto 20px",
        width: "100%",
        bg: background || "bg_widgets",
        maxWidth: maxWidth || "max_footer",
        gridGap: columnGap || "widgetGap",
        display: columns > 1 ? "grid" : "block",
        gridTemplateColumns: ["1fr", `repeat(${columns}, 1fr)`],
      }}
    />
  )
}

export default WidgetArea
