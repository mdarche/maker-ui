/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const HeaderWidgets = props => (
  <div
    {...props}
    id="header-widgets"
    sx={{
      display: "flex",
      alignItems: "center",
    }}
  />
)

HeaderWidgets.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HeaderWidgets
