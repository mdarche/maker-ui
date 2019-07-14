/** @jsx jsx */
import { jsx } from "theme-ui"
import { getOptions } from "../context/UIContext"

const Header = props => {
  const options = getOptions()
  const { sticky, maxWidth, background, justify } = props

  const stickyPartial =
    sticky || options.header.sticky
      ? {
          position: "sticky",
          top: options.topBar.sticky ? options.topBar.height : 0,
          zIndex: 99,
        }
      : null

  return (
    <header
      sx={{
        bg: background || "bg_header",
        p: 3,
        fontFamily: "nav",
        boxShadow: "header",
        borderBottom: "header",
        ...stickyPartial,
      }}
    >
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: justify || "space-between",
          m: `0 auto`,
          width: "100%",
          maxWidth: maxWidth || "max_header",
        }}
        {...props}
      />
    </header>
  )
}

export default Header
