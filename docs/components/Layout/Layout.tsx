import React from 'react'
import { useRouter } from 'next/router'
import {
  Layout as MakerLayout,
  Header,
  Navbar,
  SideNav,
  Sidebar,
  MobileMenu,
  Content,
  Main,
  Grid,
  Div,
  Footer,
  MakerMenu,
} from 'maker-ui'

import { options } from './options'
import { menu } from './menus'
import { styles } from '../../styles'
import { Search } from '../Search'
import { Logo } from '../Logo'
import { NavWidgets } from '../NavWidgets'
import { PostNavigation } from '../PostNavigation'
import { PageContents } from '../PageContents'

export const testMenu: MakerMenu = [
  { label: 'One', path: '/' },
  { label: 'Two', path: '/two' },
  {
    label: 'Three',
    path: '#',
    submenu: [
      { label: 'Five', path: '/five' },
      { label: 'Six', path: '/six' },
    ],
  },
  { label: 'Four', path: '/four' },
]

const Layout = ({ children }) => {
  const { asPath } = useRouter()
  const isDocs = asPath.includes('docs')

  return (
    <MakerLayout options={options} styles={styles}>
      <Header>
        <Navbar
          logo={<Logo />}
          menuSlot={<Search />}
          widgetSlot={<NavWidgets />}
        />
        <MobileMenu menu={menu} />
      </Header>
      <Content>
        <SideNav pathname={asPath} menu={menu} />
        <Main>
          {isDocs ? (
            <Grid breakpoints={[1200]} columns={['1fr', '1fr 260px']} gap={50}>
              <Div className="markdown" css={{ overflow: 'hidden' }}>
                {children}
                <PostNavigation />
              </Div>
              <Div breakpoints={[1200]} css={{ display: ['none', 'block'] }}>
                <PageContents pathname={asPath} />
              </Div>
            </Grid>
          ) : (
            children
          )}
        </Main>
      </Content>
      {/* <Header>
        <Navbar
          logo={<Logo />}
          menu={testMenu}
          widgetSlot={<div>Widgets</div>}
        />
        <MobileMenu menu={menu} />
      </Header>
      <Content>
        <Main>{children}</Main>
        <Sidebar>Content</Sidebar>
      </Content>
      <Footer>test</Footer> */}
    </MakerLayout>
  )
}

export default Layout
