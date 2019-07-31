/** @jsx jsx */
import { jsx } from "theme-ui"
import { List } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  ColorToggle,
  NavMenu,
  ContentWrapper,
  Main,
  TabBar,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"

import { menuItems, logoColors } from "../utils/settings"

export default props => (
  <Layout>
    <Header justify="space-between">
      <Logo colorOptions={logoColors} />
      <NavMenu
        flex
        justify="flex-end"
        menuItems={menuItems}
        sx={{ a: { p: 3 } }}
      />
      <ColorToggle />
    </Header>
    <ContentWrapper layout="sidenav-content">
      <SideNav>
        <List count={20} border={false} padding="15px 20px 0" />
      </SideNav>
      <Main maxWidth="750px" sx={{ pt: 5, px: 3 }}>
        {props.children}
      </Main>
    </ContentWrapper>
    <SideNavToggle defaultIcon sx={{ bottom: 85 }} />

    <TabBar menuItems={menuItems} />
  </Layout>
)
