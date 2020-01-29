import React from 'react'
import {
  Layout,
  Header,
  MobileNav,
  Navbar,
  Content,
  Main,
  SideNav,
  Footer,
} from 'elements-ui'
import { Box } from 'react-understudy'

// TODO - test adding variant to header... Will it conflict with eui_header?

// TODO - Add gatsby-plugin-catch-links to config & test new pages

export default props => (
  <Layout>
    <Header>
      <Navbar type="basic" menuButton="Menu" />
      {/* <MobileNav /> */}
    </Header>
    <Content layout="sidenav-content">
      <SideNav>Secondary nav links</SideNav>
      <Main>{props.children}</Main>
    </Content>
    <Footer>Footer</Footer>
  </Layout>

  // TODO - add modal layer to Layout and let users access it with API
)
