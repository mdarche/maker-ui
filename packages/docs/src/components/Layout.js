import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
  SideNav,
} from 'maker-ui'
import Prism from '@theme-ui/prism'

import Logo from './Logo'
import Widgets from './Widgets'

import { theme, options, seo, primaryMenu, docsMenu } from '../config'

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
      <Content>
        <SideNav menu={docsMenu} pathname={location.pathname} />
        <Main>{children}</Main>
      </Content>
      <Footer>test</Footer>
    </Layout>
  )
}
