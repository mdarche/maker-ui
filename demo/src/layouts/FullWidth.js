/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { Box } from "react-understudy"
import {
  Layout,
  Topbar,
  Header,
  Logo,
  NavMenu,
  Main,
  Footer,
  MenuToggle,
  MobileNav,
  FooterWidgets,
} from "gatsby-theme-elements"
import menuItems from "../utils/menu"

export default props => (
  <Layout>
    <Topbar>Here's a split nav menu</Topbar>
    <Header sticky={false} justify={["space-between", "center"]}>
      <NavMenu
        menuItems={menuItems.slice(0, 3)}
        width="350px"
        justify="flex-end"
        sx={{ a: { p: 3 } }}
      />
      <Logo sx={{ px: [0, "30px"] }} />
      <NavMenu
        menuItems={menuItems.slice(3, 5)}
        width="350px"
        sx={{ a: { p: 3 } }}
      />
      <MenuToggle icon="menu" />
    </Header>
    <MobileNav defaultClose />
    <Main maxWidth="100%" sx={{ p: 0 }}>
      <div id="content">{props.children}</div>
    </Main>
    <Footer>
      <FooterWidgets sx={{ py: "30px" }}>
        <Box height="200px" />
        <Box height="200px" />
        <Box height="200px" />
      </FooterWidgets>
      Footer text
    </Footer>
  </Layout>
)
