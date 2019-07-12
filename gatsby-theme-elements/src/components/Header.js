/** @jsx jsx */
import { jsx } from "theme-ui"
import { getOptions } from "../context/UIContext"

const Header = props => {
  const options = getOptions()

  const stickyPartial = options.header.sticky
    ? {
        position: "sticky",
        top: 0,
      }
    : null

  return (
    <header
      sx={{
        color: "headerText",
        bg: "headerBG",
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
          justifyContent: "space-between",
          m: `0 auto`,
          width: "100%",
          // maxWidth: "headerContentWidth",
          maxWidth: options.header.contentMaxWidth,
        }}
        {...props}
      />
    </header>
  )
}

export default Header
