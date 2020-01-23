import React, { useState } from "react"
import { Box } from "@theme-ui/components"

// Dropdown Animations
const fadeInUp = {}
const fadeInDown = {}

const Dropdown = ({ submenu, active, set }) => (
  <Box
    as="ul"
    variant="header.submenu"
    className={`sub-menu ${active ? "active" : ""}`}
    sx={{
      position: "absolute",
      display: "inline-block",
      top: "98%",
      left: 0,
      opacity: 0,
      visibility: "hidden",
      "&.active": {
        opacity: 1,
        visibility: "visible",
      },
    }}>
    {submenu.map(({ label, path, newTab }, index) => (
      <li key={index}>
        <a
          href={path}
          target={newTab ? "_blank" : false}
          onBlur={submenu.length === index + 1 ? () => set(false) : null}>
          {label}
        </a>
      </li>
    ))}
  </Box>
)

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
  <Box
    as="ul"
    variant="header.menu"
    className="primary-menu"
    sx={{ display: ["none", "flex"] }}>
    {menuItems.map((item, index) => (
      <MenuItem key={index} data={item} />
    ))}
  </Box>
)

export default Menu
