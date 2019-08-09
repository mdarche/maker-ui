/** @jsx jsx */
import { jsx } from "theme-ui"
import { SideAds } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  NavMenu,
  ContentWrapper,
  Sidebar,
  Main,
  Footer,
  MenuToggle,
  ColorToggle,
  MobileNav,
  Topbar,
} from "gatsby-theme-elements"

import { menuItems, logoColors } from "../utils/settings"

export default props => (
  <Layout>
    <Topbar>Optional topbar</Topbar>
    <Header justify="space-between">
      <Logo colorOptions={logoColors} />
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
    <ContentWrapper layout="sidebar-content" sx={{ pt: 5 }}>
      <Sidebar>
        <SideAds adHeights={[250, 600]} />
      </Sidebar>
      <Main>{props.children}</Main>
    </ContentWrapper>
    <Footer>Footer Text</Footer>
  </Layout>
)
