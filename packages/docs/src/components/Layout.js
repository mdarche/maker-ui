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

export default ({ children, location }) => {
  if (location.pathname.includes('/demo')) return children

  return (
    <Layout theme={theme} options={options} components={components}>
      <Header>
        <Navbar
          logo={<Logo />}
          menu={menu}
          widgetArea={<Widgets />}
          location={location.pathname}
        />
        <MobileMenu />
      </Header>
      {location.pathname.includes('/docs') ? (
        <Content layout="content-sidenav">
          <Main>{children}</Main>
          <SideNav>
            <DocsMenu />
          </SideNav>
        </Content>
      ) : (
        <Content layout="full-width">
          <Main>{children}</Main>
        </Content>
      )}
    </Layout>
  )
}
