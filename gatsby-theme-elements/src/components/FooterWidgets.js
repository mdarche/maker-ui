/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const FooterWidgets = ({ columns = true, gridGap, ...props }) => {
  const columnCount = Array.isArray(props.children) ? props.children.length : 1
  const gap = gridGap ? { gridGap } : { variant: "gaps.widgetGap" }

  return (
    <div
      {...props}
      id="footer-widgets"
      sx={{
        m: "0 auto",
        display: columnCount > 1 ? "grid" : "block",
        gridTemplateColumns: ["1fr", `repeat(${columnCount}, 1fr)`],
        ...gap,
      }}
    />
  )
}

FooterWidgets.propTypes = {
  gridGap: PropTypes.number,
  children: PropTypes.node.isRequired,
}

export default FooterWidgets
