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

import { options } from './options'
import { menu } from './menu'

export const Layout = ({ children }) => {
  return (
    <ThemeLayout options={options}>
      <Header>
        <Navbar menu={menu} />
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
