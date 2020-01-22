import React from "react"
import { Box, Flex } from "@theme-ui/components"

import { Menu, MenuButton, ColorButton, WidgetArea } from "./common"

const BasicNav = ({
  logo = "Logo",
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
}) => {
  return (
    <React.Fragment>
      <Box>
        <a href="/">{logo}</a>
      </Box>
      <Flex sx={{ justifyContent: "flex-end", alignItems: "center" }}>
        <Menu menuItems={menu} />
        <Box>
          <WidgetArea custom={widgetArea} />
          <MenuButton custom={menuToggle} />
          <ColorButton custom={colorToggle} />
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default BasicNav
