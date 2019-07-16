/** @jsx jsx */
import { jsx } from "theme-ui"

const WidgetArea = props => {
  const { maxWidth, background, columnGap } = props
  const columns = props.children.length

  return (
    <div
      sx={{
        p: 3,
        borderTop: "footer",
        background: background || "bg_widgets",
      }}
    >
      <div
        {...props}
        sx={{
          m: "0 auto",
          width: "100%",
          maxWidth: maxWidth || "max_footer",
          gridGap: columnGap || "widgetGap",
          display: columns > 1 ? "grid" : "block",
          gridTemplateColumns: ["1fr", `repeat(${columns}, 1fr)`],
        }}
      />
    </div>
  )
}

export default WidgetArea
