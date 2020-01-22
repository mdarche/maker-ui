import React from "react"
import { Box } from "@theme-ui/components"

// TODO - Figure out how to make dropdown accessible while parent link is still usable

const Dropdown = ({ submenu }) => (
  <Box
    as="ul"
    variant="header.submenu"
    className="sub-menu"
    sx={{ position: "absolute" }}>
    {submenu.map(i => (
      <li key={i.label}>
        <a href={i.path} target={i.newTab ? "_blank" : false}>
          {i.label}
        </a>
      </li>
    ))}
  </Box>
)

const Menu = ({ menuItems = [] }) => (
  <Box
    as="ul"
    variant="header.menu"
    className="primary-menu"
    sx={{ display: ["none", "flex"] }}>
    {menuItems.map(({ label, path, newTab, submenu }) => (
      <Box as="li" key={label} sx={{ position: "relative" }}>
        <a
          href={path}
          target={newTab ? "_blank" : false}
          className={submenu ? "has-children" : ""}>
          {label}
        </a>
        {submenu ? (
          <React.Fragment>
            <Box as="button">
              <span className="visuallyhidden">Submenu</span>
            </Box>
            <Dropdown submenu={submenu} />
          </React.Fragment>
        ) : null}
      </Box>
    ))}
  </Box>
)

export default Menu
