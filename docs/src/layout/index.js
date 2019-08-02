/** @jsx jsx */
import { jsx } from "theme-ui"
import {
  Layout,
  Header,
  Logo,
  NavMenu,
  ColorToggle,
  ContentWrapper,
  Main,
  SideNav,
  Footer,
  MenuToggle,
  MobileNav,
} from "gatsby-theme-elements"

const menuItems = []

export default props => (
  <Layout>
    <Header justify="space-between">
      <Logo />
      <NavMenu
        flex
        justify="flex-end"
        menuItems={menuItems}
        sx={{ a: { p: 3 } }}
      />
      <div sx={{ display: "flex" }}>
        <ColorToggle />
        <MenuToggle icon="menu" />
      </div>
    </Header>
    <MobileNav defaultClose />
    <ContentWrapper sx={{ pt: 5 }}>
      <SideNav>
        <div sx={{ height: 500 }} />
      </SideNav>
      <Main>{props.children}</Main>
    </ContentWrapper>
    <Footer />
  </Layout>
)
