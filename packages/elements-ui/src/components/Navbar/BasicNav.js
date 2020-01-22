import React from "react"
import { Box, Flex } from "@theme-ui/components"

import Menu from "./Menu"
import MenuButton from "./MenuButton"
import ColorButton from "./ColorButton"

const BasicNav = ({
  logo = "Logo",
  menuItems,
  colorToggle,
  widgetArea,
  menuToggle,
}) => {
  return (
    <React.Fragment>
      <Box>
        <a href="/">{logo}</a>
      </Box>
      <Flex>
        <Menu menu={menuItems} />
        <Box>
          <Flex sx={{ display: ["none", "flex"] }}>{widgetArea}</Flex>
          <MenuButton custom={menuToggle} />
          {/* <ColorButton custom={colorToggle} /> */}
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default BasicNav
