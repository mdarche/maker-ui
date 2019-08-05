/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

import HeaderTemplate from "./template-parts/header"
import {
  Layout,
  Topbar,
  ContentWrapper,
  Main,
  MobileNav,
  FooterWidgets,
  Footer,
  TabBar,
} from "../components"

const ElementsTemplate = ({
  menuItems,
  logo,
  logoColors = {},
  colorToggle,
  menuToggle = null,
  mobileNav,
  headerWidgets,
  footerWidgets,
  topbar,
  footer,
  tabBar,
  // options,
  children,
}) => {
  const options = {
    header: {
      navType: "split", // split, center
      logoHeight: "60px", // accepts array for scale
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
  }

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

      <ContentWrapper sx={{ pt: 5 }}>
        <Main>{children}</Main>
      </ContentWrapper>
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

ElementsTemplate.propTypes = {
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

export default ElementsTemplate
