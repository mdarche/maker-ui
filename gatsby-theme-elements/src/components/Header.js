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
        color: "headerText",
        bg: background || "headerBG",
        p: 3,
        fontFamily: "body",
        boxShadow: "headerShadow",
        borderBottom: "headerBorder",
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
          maxWidth: maxWidth || "headerWidth",
        }}
        {...props}
      />
    </header>
  )
}

export default Header
