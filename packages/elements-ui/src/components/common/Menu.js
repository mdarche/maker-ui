import React, { useState } from "react"
import { Box } from "theme-ui"

import Dropdown from "./Dropdown"

// TODO smooth out this hover and dropdown focus with variants

const MenuItem = ({ data: { label, path, newTab, submenu } }) => {
  const [active, set] = useState(false)
  return (
    <Box
      as="li"
      sx={{
        position: "relative",
        display: "inline-flex",
        "&:hover": {
          ".sub-menu": {
            opacity: 1,
            visibility: "visible",
          },
        },
      }}>
      <a
        href={path}
        target={newTab ? "_blank" : false}
        onFocus={submenu ? () => set(true) : null}>
        {label}
      </a>
      {submenu ? (
        <Dropdown submenu={submenu} active={active} set={set} />
      ) : null}
    </Box>
  )
}

const Menu = ({ menuItems = [] }) => (
  <Box as="nav" className="nav-primary" sx={{ display: ["none", "flex"] }}>
    <Box as="ul" variant="header.menu" className="menu-primary">
      {menuItems.map((item, index) => (
        <MenuItem key={index} data={item} />
      ))}
    </Box>
  </Box>
)

export default Menu
