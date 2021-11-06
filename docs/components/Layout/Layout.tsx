import React from 'react'
import { useRouter } from 'next/router'
import {
  Layout as MakerLayout,
  Header,
  Navbar,
  SideNav,
  Content,
  Main,
  Grid,
  Div,
} from 'maker-ui'

import { options } from './options'
import { menu } from './menus'
import { styles } from '../../styles'
import { Search } from '../Search'
import { Logo } from '../Logo'
import { NavWidgets } from '../NavWidgets'
import { PostNavigation } from '../PostNavigation'
import { PageContents } from '../PageContents'

const testMenu = [
  { path: '', label: 'Home' },
  { path: '', label: 'About' },
  { path: '', label: 'More Info' },
  {
    path: '',
    label: 'Test',
    submenu: [
      { path: '', label: 'Home' },
      { path: '', label: 'About' },
      { path: '', label: 'More Info' },
    ],
  },
  {
    path: '',
    label: 'Test',
    megamenu: (
      <Div css={{ padding: 50 }}>
        <a href="https://google.com">Test</a>
      </Div>
    ),
  },
]

const Layout = ({ children }) => {
  const { asPath } = useRouter()
  const isDocs = asPath.includes('docs')

  return (
    <MakerLayout options={options} styles={styles}>
      <Header>
        <Navbar
          logo={<Logo path={asPath} />}
          menu={testMenu}
          css={{ 'li a': { padding: '5px 20px' } }}
        />
        {/* <Navbar
          logo={<Logo path={asPath} />}
          menuSlot={<Search />}
          widgetSlot={<NavWidgets />}
        /> */}
      </Header>
      <Content>
        <SideNav pathname={asPath} menu={menu} />
        <Main>
          {isDocs ? (
            <Grid breakpoints={[1200]} columns={['1fr', '1fr 260px']} gap={50}>
              <Div
                className="markdown"
                css={{ overflow: ['hidden', 'initial'] }}>
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
    </MakerLayout>
  )
}

export default Layout
