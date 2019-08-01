/** @jsx jsx */
import { jsx } from "theme-ui"
import { SideAds } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  NavMenu,
  Main,
  ContentWrapper,
  Sidebar,
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
    <ContentWrapper layout="content-sidebar" sx={{ pt: 5 }}>
      <Main>{props.children}</Main>
      <Sidebar>
        <SideAds adHeights={[250, 600]} />
      </Sidebar>
    </ContentWrapper>
    <Footer>Footer Text</Footer>
  </Layout>
)
