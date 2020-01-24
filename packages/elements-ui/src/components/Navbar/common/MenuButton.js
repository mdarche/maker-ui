import React from "react"
import { Box, MenuButton } from "theme-ui"

import { useMenu, useOptions } from "../../../context/ElementsContext"

export default props => {
  const [menu, toggleMenu] = useMenu()
  const { mobileMenu } = useOptions()

  const { custom, desktopVisible = mobileMenu.desktopVisible } = props

  const visibility = desktopVisible
    ? { display: "block" }
    : { display: ["block", "none"] }

  return custom ? (
    <Box
      as="button"
      title="Menu"
      aria-label="Toggle Menu"
      aria-expanded={menu ? "true" : "false"}
      onClick={toggleMenu}
      variant="header.menuButton"
      sx={{ ...visibility, m: "0 auto" }}>
      {custom}
    </Box>
  ) : (
    <MenuButton
      aria-expanded={menu ? "true" : "false"}
      onClick={toggleMenu}
      variant="header.menuButton"
      sx={{ ...visibility, svg: { m: "0 auto" } }}
    />
  )
}
