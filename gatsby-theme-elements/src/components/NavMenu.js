/** @jsx jsx */
import { jsx } from "theme-ui"

const NavMenu = props => {
  return (
    <ul
      {...props}
      aria-label="Main Navigation"
      role="menu"
      sx={{
        display: ["none", "flex"],
        listStyle: "none",
      }}
    />
  )
}

export default NavMenu
