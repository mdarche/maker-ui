import React from 'react'

import {
  Layout,
  Topbar,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  SideNav,
  Sidebar,
  Footer,
} from './index'
import { useOptions } from '../context/OptionContext'

const SiteInner = ({ sideNav, sidebar, children }) => {
  const { layout } = useOptions()

  switch (layout) {
    case 'content-sidebar':
      return (
        <Content>
          <Main>{children}</Main>
          <Sidebar>{sidebar}</Sidebar>
        </Content>
      )
    case 'sidebar-content':
      return (
        <Content>
          <Sidebar>{sidebar}</Sidebar>
          <Main>{children}</Main>
        </Content>
      )
    case 'content-sideNav':
      return (
        <Content>
          <Main>{children}</Main>
          <SideNav>{sideNav}</SideNav>
        </Content>
      )
    case 'sideNav-content':
      return (
        <Content>
          <SideNav>{sideNav}</SideNav>
          <Main>{children}</Main>
        </Content>
      )
    default:
      return (
        <Content>
          <Main>{children}</Main>
        </Content>
      )
  }
}

export const Template = ({
  theme,
  options,
  components,
  topbar,
  headerWidgets,
  menuToggle,
  colorToggle,
  logo,
  menu,
  mobileMenu,
  sideNav,
  sidebar,
  children,
  footer,
}) => {
  return (
    <Layout theme={theme} options={options} components={components}>
      {topbar && <Topbar>{topbar}</Topbar>}
      <Header>
        <Navbar
          logo={logo}
          menu={menu}
          widgetArea={headerWidgets}
          menuToggle={menuToggle}
          colorToggle={colorToggle}
        />
        {mobileMenu && <MobileMenu>{mobileMenu}</MobileMenu>}
      </Header>
      <SiteInner sideNav={sideNav} sidebar={sidebar}>
        {children}
      </SiteInner>
      {footer && <Footer>{footer}</Footer>}
    </Layout>
  )
}
