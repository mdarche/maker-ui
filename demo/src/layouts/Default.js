/** @jsx jsx */
import { jsx } from "theme-ui"
import { Box } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  NavMenu,
  Main,
  Footer,
  MenuToggle,
  ColorToggle,
  MobileNav,
  FooterWidgets,
} from "gatsby-theme-elements"
import menuItems from "../utils/menu"

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
    <Main>
      <div id="content">{props.children}</div>
    </Main>
    <Footer>
      <FooterWidgets sx={{ pt: "30px" }}>
        <Box height="200px" />
        <Box height="200px" />
        <Box height="200px" />
      </FooterWidgets>
    </Footer>
  </Layout>
)
