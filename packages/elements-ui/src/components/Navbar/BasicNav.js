import React from "react"
import { Box, Flex, MenuButton } from "@theme-ui/components"

import Menu from "./Menu"
import { useMenu } from "../../context/ElementsContext"

const BasicNav = ({ logo = "Logo", menuItems, colorToggle, menuButton }) => {
  const [menu, toggleMenu] = useMenu()

  console.log(menu)

  return (
    <React.Fragment>
      <Box>
        <a href="/">{logo}</a>
      </Box>
      <Flex>
        <Menu menu={menuItems} />
        <Box>
          {menuButton ? (
            <Box
              as="button"
              title="Menu"
              aria-label="Toggle Menu"
              onClick={toggleMenu}>
              {menuButton}
            </Box>
          ) : (
            <MenuButton onClick={toggleMenu} />
          )}
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default BasicNav
