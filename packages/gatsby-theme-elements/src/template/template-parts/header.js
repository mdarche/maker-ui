/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import {
  Header,
  Logo,
  NavMenu,
  HeaderWidgets,
  MenuToggle,
  ColorToggle,
} from "../../components"

export default ({
  menuItems,
  logo,
  logoColors,
  colorToggle,
  menuToggle,
  headerWidgets,
  options,
}) => {
  const navPartial = {
    a: {
      fontSize: options.navLinkFontSize,
      p: options.navLinkPadding,
    },
  }

  const widgetPartial =
    options.navType !== "right"
      ? { position: ["relative", "absolute"], right: 0 }
      : null

  const renderLogo = () => (
    <Logo
      height={options.logoHeight}
      colorOptions={logoColors}
      sx={{ p: [0, options.logoPadding] }}>
      {logo}
    </Logo>
  )

  return (
    <Header
      sx={{
        padding: options.headerPadding,
        variant: `layout.header.${options.navType}`,
      }}>
      {options.navType === "split" ? (
        <React.Fragment>
          <NavMenu
            menuItems={menuItems.filter(({ split }) => split === "left")}
            width="33%"
            justify="flex-end"
            sx={{ ...navPartial }}
          />
          {renderLogo()}
          <NavMenu
            menuItems={menuItems.filter(({ split }) => split === "right")}
            width="33%"
            sx={{ ...navPartial }}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {options.navType === "center" ? (
            <div sx={{ variant: "layout.fullFlex" }}>{renderLogo()}</div>
          ) : (
            renderLogo()
          )}
          <NavMenu
            flex={options.navType === "right" ? true : false}
            justify={options.navType === "center" ? "center" : "flex-end"}
            menuItems={menuItems}
            sx={{ ...navPartial }}
          />
        </React.Fragment>
      )}
      <HeaderWidgets sx={{ ...widgetPartial }}>
        {options.colorToggle ? <ColorToggle>{colorToggle}</ColorToggle> : null}
        {options.mobileNavActive ? (
          <MenuToggle icon={options.defaultMenuIcon ? "menu" : null}>
            {menuToggle}
          </MenuToggle>
        ) : null}
        {headerWidgets}
      </HeaderWidgets>
    </Header>
  )
}
