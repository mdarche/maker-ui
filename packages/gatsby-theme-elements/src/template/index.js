/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import merge from "deepmerge"

import { validate } from "../utils/helper"
import HeaderTemplate from "./template-parts/header"
import ContentTemplate from "./template-parts/content"
import {
  Layout,
  Topbar,
  MobileNav,
  FooterWidgets,
  Footer,
  TabBar,
} from "../components"

const Template = ({
  menuItems,
  logo,
  logoColors = {},
  colorToggle,
  menuToggle,
  mobileNav,
  headerWidgets,
  footerWidgets,
  topbar,
  footer,
  tabBar,
  sidebar,
  sideNav,
  settings,
  children,
}) => {
  const options = merge(
    {
      header: {
        navType: "right", // split, center
        logoHeight: "60px", // can be array
        logoPadding: 0,
        headerPadding: 3,
        navLinkPadding: 3,
        navLinkFontSize: 3,
        mobileNavActive: true,
        defaultCloseIcon: true,
        defaultMenuIcon: true,
        colorToggle: true,
      },
      content: {
        paddingTop: 5,
        sideBarPosition: "right",
        sideNavPosition: "left",
      },
      tabBar: {
        active: false,
      },
    },
    validate(settings)
  )

  return (
    <Layout>
      {topbar ? <Topbar>{topbar}</Topbar> : null}

      <HeaderTemplate
        menuItems={menuItems}
        logo={logo}
        logoColors={logoColors}
        colorToggle={colorToggle}
        menuToggle={menuToggle}
        headerWidgets={headerWidgets}
        mobileNav={mobileNav}
        options={options.header}
      />

      {options.header.mobileNavActive ? (
        <MobileNav defaultClose={options.header.defaultCloseIcon}>
          {mobileNav}
        </MobileNav>
      ) : null}

      <ContentTemplate
        sidebar={sidebar}
        sideNav={sideNav}
        options={options.content}>
        {children}
      </ContentTemplate>

      {footer ? (
        <Footer>
          {footerWidgets ? (
            <FooterWidgets sx={{ pt: "30px" }}>{footerWidgets}</FooterWidgets>
          ) : null}
          {footer}
        </Footer>
      ) : null}
      {options.tabBar.active ? (
        <TabBar menuItems={menuItems}>{tabBar}</TabBar>
      ) : null}
    </Layout>
  )
}

Template.propTypes = {
  topbar: PropTypes.node,
  menuItems: PropTypes.array.isRequired,
  logo: PropTypes.node,
  colorToggle: PropTypes.node,
  menuToggle: PropTypes.node,
  mobileNav: PropTypes.node,
  footerWidgets: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
}

export default Template
