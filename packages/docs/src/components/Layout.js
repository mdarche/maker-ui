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

import Logo from './Logo'
import DocsMenu from './DocsMenu'
import Widgets from './Widgets'

import { options, menu } from '../config/options'
import theme from '../config/theme'

const components = {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
}

export default React.memo(({ children }) => {
  return (
    <Layout theme={theme} options={options} components={components}>
      <Header>
        <Navbar logo={<Logo />} menu={menu} widgetArea={<Widgets />} />
        <MobileMenu menu={menu} />
      </Header>
      <Content layout="content-sidenav">
        <Main>{children}</Main>
        <SideNav>
          <DocsMenu />
        </SideNav>
      </Content>
    </Layout>
  )
})
