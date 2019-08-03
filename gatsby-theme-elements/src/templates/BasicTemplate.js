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
  Footer,
  MenuToggle,
  ColorToggle,
  MobileNav,
  FooterWidgets,
} from "gatsby-theme-elements"

// const templateOptions = {
//   headerJustify: "space-between",
// }

export const BasicTemplate = ({
  menuItems,
  logo,
  logoColors = {},
  colorToggle,
  menuToggle,
  mobileNav,
  footerWidgets,
  topbar,
  footer,
  children,
}) => {
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
      <MobileNav defaultClose={options.navClose ? navClose : true}>
        {mobileNav}
      </MobileNav>
      <ContentWrapper sx={{ pt: 5 }}>
        <Main>{children}</Main>
      </ContentWrapper>
      <Footer>
        {footerWidgets ? (
          <FooterWidgets sx={{ pt: "30px" }}>{footerWidgets}</FooterWidgets>
        ) : null}
        {footer}
      </Footer>
    </Layout>
  )
}

ContentWrapper.propTypes = {
  topbar: PropTypes.node,
  menuItems: PropTypes.object.isRequired,
  logo: PropTypes.node,
  colorToggle: PropTypes.node,
  menuToggle: PropTypes.node,
  mobileNav: PropTypes.node,
  footerWidgets: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
}
