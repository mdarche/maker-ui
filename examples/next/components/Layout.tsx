import React from 'react'
import {
  Layout as ThemeLayout,
  Header,
  Navbar,
  SideNav,
  MobileMenu,
  Content,
  Main,
  Footer,
} from 'maker-ui'

import { theme } from '../config/theme'
import { options } from '../config/options'
import { menu } from '../config/menu'

const Layout = ({ children }) => {
  return (
    <ThemeLayout theme={theme} options={options}>
      <Header>
        <Navbar type="basic-left" menu={menu} />
        <MobileMenu menu={menu} />
      </Header>
      <Content>
        <SideNav>Test</SideNav>
        <Main>{children}</Main>
      </Content>
      <Footer>Footer</Footer>
    </ThemeLayout>
  )
}

export default Layout
