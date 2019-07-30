/** @jsx jsx */
import { jsx } from "theme-ui"
import { SideAds } from "react-understudy"
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
  Topbar,
} from "gatsby-theme-elements"
import menuItems from "../utils/menu"

export default props => (
  <Layout>
    <Topbar>Optional topbar</Topbar>
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
    <Main sidebarPosition="right">
      <div id="content">{props.children}</div>
      <aside id="sidebar">
        <SideAds adHeights={[250, 600]} />
      </aside>
    </Main>
    <Footer>Footer Text</Footer>
  </Layout>
)
