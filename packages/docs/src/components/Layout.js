import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  SideNav,
} from 'maker-ui'
import Prism from '@theme-ui/prism'

import Logo from './Logo'
import DocsMenu from './DocsMenu'
import Widgets from './Widgets'

import { theme, options, seo, primaryMenu } from '../config'

const components = {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
}

export default ({ children, location }) => {
  return (
    <Layout theme={theme} options={options} components={components}>
      <Header>
        <Navbar
          logo={<Logo />}
          menu={primaryMenu}
          pathname={location.pathname}
          widgetArea={<Widgets />}
        />
        <MobileMenu menu={primaryMenu} />
      </Header>
      <Content layout="content-sidenav">
        <Main>{children}</Main>
        <SideNav menu={primaryMenu} pathname={location.pathname} />
      </Content>
      {/* {location.pathname.includes('/docs') ? (
        <Content layout="content-sidenav">
          <Main>{children}</Main>
          <SideNav menu={menu} />
        </Content>
      ) : (
        <Content layout="full-width">
          <Main>{children}</Main>
        </Content>
      )} */}
    </Layout>
  )
}
