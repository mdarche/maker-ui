import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  SideNav,
} from 'elements-ui'
import Prism from '@theme-ui/prism'

import Logo from './logo'
import options from '../config/options'
import theme from '../config/theme'

const components = {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
}

export default ({ children }) => (
  <Layout theme={theme} options={options} components={components}>
    <Header>
      <Navbar logo={<Logo />} />
      <MobileMenu />
    </Header>
    <Content>
      <Main>{children}</Main>
      <SideNav>test</SideNav>
    </Content>
  </Layout>
)
