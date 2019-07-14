/** @jsx jsx */
import { jsx } from "theme-ui"
import { getOptions } from "../context/UIContext"

const WidgetArea = props => {
  const options = getOptions().footer
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
        sx={{
          m: "0 auto",
          width: "100%",
          maxWidth: maxWidth || "max_footer",
          gridColumnGap: columnGap || options.columnGap,
          gridRowGap: 30,
          display: columns > 1 ? "grid" : "block",
          gridTemplateColumns: ["1fr", `repeat(${columns}, 1fr)`],
        }}
        {...props}
      />
    </div>
  )
}

export default WidgetArea
