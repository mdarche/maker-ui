import React from 'react'
import {
  Layout as MakerLayout,
  Header,
  Navbar,
  SideNav,
  MobileMenu,
  Content,
  Main,
  Footer,
  // Sidebar,
} from 'maker-ui'

import { options } from '../config/options'
import { menu } from '../config/menus'

const Layout = ({ children }) => {
  return (
    <MakerLayout options={options}>
      <Header>
        <Navbar menu={menu} />
        <MobileMenu menu={menu} />
      </Header>
      <Content>
        <SideNav>Test</SideNav>
        <Main>{children}</Main>
      </Content>
      <Footer>Footer</Footer>
    </MakerLayout>
  )
}

export default Layout
