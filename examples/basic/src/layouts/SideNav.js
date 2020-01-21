import React from "react"
import {
  Layout,
  Header,
  Navbar,
  Content,
  Main,
  SideNav,
  Footer,
} from "elements-ui"
import { Box } from "react-understudy"

import options from "./options"

// TODO - test adding variant to header... Will it conflict with eui_header?

export default props => (
  <Layout>
    <Header>
      <Navbar
      // logo={}
      // menuItems={}
      // menuButton={}
      // widgetArea={}
      // colorToggle={}

      // Check theme options
      />
    </Header>
    <Content layout="sidenav-content">
      <SideNav>Secondary nav links</SideNav>
      <Main>{props.children}</Main>
    </Content>
    <Footer>Footer</Footer>
  </Layout>

  //TODO - add modal layer to Layout and let users access it with API
  // - Basic Nav, Split Nav, Centered Nav
)
