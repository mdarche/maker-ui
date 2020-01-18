/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useLayout } from "../context/ElementsContext"

const Main = ({ maxWidth = "max_content", ...props }) => {
  const [layout] = useLayout()

  const widthPartial =
    layout === "sidenav-content" ? { maxWidth, m: "0 auto" } : null

  return (
    <main
      id="#content"
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
