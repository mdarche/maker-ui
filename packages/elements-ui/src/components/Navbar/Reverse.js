import React from "react"
import { Box, Flex } from "theme-ui"

import { Menu, MenuButton, ColorButton, WidgetArea } from "./common"

const Reverse = ({
  logo = "Logo",
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
  maxWidth = "maxWidth_header",
  variant = "navbar",
  sx,
}) => (
  <Flex
    variant={variant}
    sx={{ variant: "eui_header.reverse", maxWidth, ...sx }}>
    <Flex sx={{ width: ["25%", "33%"] }}>
      <Menu menuItems={menu} />
      <MenuButton custom={menuToggle} />
    </Flex>
    <Flex
      id="site-logo"
      variant="header.logo"
      sx={{
        width: ["50%", "34%"],
        justifyContent: "center",
        alignItems: "center",
      }}>
      <a href="/">{logo}</a>
    </Flex>
    <Flex
      sx={{
        width: ["25%", "33%"],
        alignItems: "center",
        justifyContent: "flex-end",
      }}>
      <WidgetArea custom={widgetArea} />
      <ColorButton custom={colorToggle} />
    </Flex>
  </Flex>
)

export default Reverse
