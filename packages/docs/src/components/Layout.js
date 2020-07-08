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

import { CodeProvider } from './CodeContext'
import Logo from './Logo'
import Widgets from './Widgets'
import Search from './Search'

import { theme, options, seo, primaryMenu, docsMenu } from '../config'

const components = {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
}

export default ({ children, location }) => {
  return (
    <Layout theme={theme} options={options} components={components}>
      <Header>
        <Navbar logo={<Logo />} menu={<Search />} widgetArea={<Widgets />} />
        <MobileMenu menu={primaryMenu} />
      </Header>
      <Content>
        <SideNav menu={docsMenu} pathname={location.pathname} />
        <Main>
          <CodeProvider>{children}</CodeProvider>
        </Main>
      </Content>
      <Footer>test</Footer>
    </Layout>
  )
}
