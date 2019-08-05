/** @jsx jsx */
import { jsx } from "theme-ui"

import {
  Header,
  Logo,
  NavMenu,
  HeaderWidgets,
  MenuToggle,
  ColorToggle,
  MobileNav,
} from "../components"

export default ({
  menuItems,
  logo,
  logoColors,
  colorToggle,
  menuToggle,
  mobileNav,
  options,
}) => (
  <Header justify={["space-between", "center"]} sx={{ flexWrap: "wrap" }}>
    <div
      sx={{
        width: ["auto", "100%"],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Logo colorOptions={logoColors}>{logo}</Logo>
    </div>
    <NavMenu
      justify={"center"}
      menuItems={menuItems}
      sx={{ a: { fontSize: navLinkFontSize, p: navLinkPadding } }}
    />
    <HeaderWidgets>
      <ColorToggle />
      <MenuToggle />
    </HeaderWidgets>
  </Header>
)
