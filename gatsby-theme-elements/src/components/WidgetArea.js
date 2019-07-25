/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const WidgetArea = props => {
  const { maxWidth, backgroundColor, gridGap } = props
  const columns = Array.isArray(props.children) ? props.children.length : 1

  // Partials

  const gap = gridGap ? { gridGap } : { variant: "gaps.widgetGap" }

  return (
    <div
      {...props}
      sx={{
        m: "0 auto 20px",
        width: "100%",
        bg: backgroundColor || "bg_footer",
        maxWidth: maxWidth || "max_footer",
        display: columns > 1 ? "grid" : "block",
        gridTemplateColumns: ["1fr", `repeat(${columns}, 1fr)`],
        ...gap,
      }}
    />
  )
}

WidgetArea.propTypes = {
  backgroundColor: PropTypes.string,
  gridGap: PropTypes.number,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

export default WidgetArea
