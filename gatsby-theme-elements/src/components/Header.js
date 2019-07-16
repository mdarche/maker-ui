/** @jsx jsx */
import { jsx } from "theme-ui"
import { useOptions } from "../context/UIContext"
import { useMeasurements } from "../context/MeasureContext"

const Header = props => {
  const options = useOptions()
  const { topbarHeight } = useMeasurements()
  const { sticky, maxWidth, background } = props

  const stickyPartial =
    sticky || options.header.sticky
      ? {
          position: "sticky",
          top: options.topbar.sticky ? topbarHeight : 0,
          zIndex: 100,
        }
      : null

  return (
    <header
      sx={{
        bg: background || "bg_header",
        fontFamily: "nav",
        p: 3,
        boxShadow: "header",
        borderBottom: "header",
        ...stickyPartial,
      }}
    >
      <div
        {...props}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          m: "0 auto",
          width: "100%",
          maxWidth: maxWidth || "max_header",
        }}
      />
    </header>
  )
}

export default Header
