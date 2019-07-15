/** @jsx jsx */
import { jsx } from "theme-ui"

const NavMenu = props => {
  return (
    <ul
      aria-label="Main Navigation"
      role="menu"
      sx={{
        display: ["none", "flex"],
        listStyle: "none",
      }}
      {...props}
    />
  )
}

export default NavMenu
