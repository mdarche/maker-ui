/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

import {
  Layout,
  Topbar,
  Header,
  Logo,
  NavMenu,
  ContentWrapper,
  Main,
  MenuToggle,
  ColorToggle,
  MobileNav,
  FooterWidgets,
  Footer,
} from "../components"

const ElementsTemplate = ({
  menuItems,
  logo,
  logoColors = {},
  colorToggle,
  menuToggle,
  mobileNav,
  footerWidgets,
  topbar,
  footer,
  options,
  children,
}) => {
  const testOptions = {
    navPosition: "right", // split, center
    logoHeight: "200px", // accepts array for scale
    headerPadding: 3,
    navLinkPadding: 3,
    navLinkFontSize: 2,
    mobileCloseIcon: true,
    colorToggle: true,
    menuToggle: true,
    sideBarPosition: "right",
    sideNavPosition: "left",
    tabBarActive: false,
  }

  const renderHeader = () => {}

  const renderContent = () => {}

  return (
    <Layout>
      {topbar ? <Topbar>{topbar}</Topbar> : null}
      <Header justify="space-between">
        <Logo colorOptions={logoColors}>{logo}</Logo>
        <NavMenu
          flex
          justify="flex-end"
          menuItems={menuItems}
          sx={{ a: { p: 3 } }}
        />
        <div sx={{ display: "flex" }}>
          <ColorToggle>{colorToggle}</ColorToggle>
          <MenuToggle icon="menu">{menuToggle}</MenuToggle>
        </div>
      </Header>
      <MobileNav defaultClose>{mobileNav}</MobileNav>
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
