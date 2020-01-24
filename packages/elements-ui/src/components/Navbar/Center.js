import React from "react"
import { Box, Flex } from "theme-ui"

import { Menu, MenuButton, ColorButton, WidgetArea } from "./common"

const Center = ({
  logo = "Logo",
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
  maxWidth = "maxWidth_header",
  variant = "navbar",
  sx,
}) => {
  return (
    <Flex
      variant={variant}
      sx={{ variant: "eui_header.center", maxWidth, ...sx }}>
      <Flex>
        <Box id="site-logo" variant="header.logo">
          <a href="/">{logo}</a>
        </Box>
      </Flex>
      <Flex sx={{ alignItems: "center" }}>
        <Menu menuItems={menu} />
        <Box>
          <WidgetArea custom={widgetArea} />
          <MenuButton custom={menuToggle} />
          <ColorButton custom={colorToggle} />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Center
