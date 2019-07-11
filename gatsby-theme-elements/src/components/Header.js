/** @jsx jsx */
import { jsx } from "theme-ui"
import { useContext } from "react"
import { UIContext } from "../context/UIContext"

const Header = props => {
  const { options } = useContext(UIContext)
  const settings = options.header

  return (
    <header
      sx={{
        color: "primary",
        bg: "lightgray",
        fontFamily: "body",
        // raw CSS value
        boxShadow: "0 0 1px 3px rgba(0, 0, 0, .125)",
      }}
      {...props}
    >
      Test Header {settings.mobileNavStyle}
    </header>
  )
}

export default Header
