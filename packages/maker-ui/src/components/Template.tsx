import React from 'react'
import { Theme } from 'theme-ui'

import { MakerOptions, MaybeElement, MenuProps } from './types'
import { Layout } from './Layout'
import { Topbar } from './Topbar'
import { Header } from './Header'
import { Navbar } from './Navbar'
import { MobileMenu } from './MobileMenu'
import { Content } from './Content'
import { Main } from './Main'
import { SideNav } from './SideNav'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

import { useOptions } from '../context/OptionContext'

const SiteInner = ({ sideNav, sidebar, menu, children }) => {
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
          <SideNav menu={menu} customToggle={sideNav[1]} pathname={sideNav[2]}>
            {sideNav[0]}
          </SideNav>
        </Content>
      )
    case 'sideNav-content':
      return (
        <Content>
          <SideNav menu={menu} customToggle={sideNav[1]} pathname={sideNav[2]}>
            {sideNav[0]}
          </SideNav>
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

interface TemplateProps {
  theme: Theme
  options: MakerOptions
  components?: object
  topbar?: MaybeElement
  headerWidgets?: MaybeElement
  menuToggle?: MaybeElement
  colorToggle?: MaybeElement
  logo?: MaybeElement
  menu: MenuProps[]
  mobileMenu?: string
  sideNav?: MaybeElement
  sideNavToggle?: MaybeElement
  sidebar?: MaybeElement
  footer?: MaybeElement
  pathname?: string
  children: React.ReactNode
}

/**
 * Use the `Template` component to quickly build layouts. You can supply an assortment
 * of React elements as props and customize with your `theme` and `options` objects.
 *
 * @see https://maker-ui.com/docs/templates
 */

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
  mobileMenu = 'default',
  sideNav,
  sideNavToggle,
  sidebar,
  footer,
  pathname,
  children,
}: TemplateProps) => {
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
          pathname={pathname}
        />
        {mobileMenu === 'default' ? (
          <MobileMenu menu={menu} />
        ) : React.isValidElement(mobileMenu) ? (
          <MobileMenu>{mobileMenu}</MobileMenu>
        ) : null}
      </Header>
      <SiteInner
        sideNav={[sideNav, sideNavToggle, pathname]}
        sidebar={sidebar}
        menu={menu}>
        {children}
      </SiteInner>
      {footer && <Footer>{footer}</Footer>}
    </Layout>
  )
}
