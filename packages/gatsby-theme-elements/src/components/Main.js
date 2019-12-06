/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useMeasurements } from "../context/MeasureContext"

const Main = ({ maxWidth, ...props }) => {
  const { sideNavWidth } = useMeasurements()

  const widthPartial =
    sideNavWidth !== 0
      ? { maxWidth: maxWidth || "max_content", m: "auto" }
      : null

  return (
    <main
      id="#content"
      key="Main"
      {...props}
      sx={{
        flex: 1,
        ...widthPartial,
      }}
    />
  )
}

Main.propTypes = {
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default Main
