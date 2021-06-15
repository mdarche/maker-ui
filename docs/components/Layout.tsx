import React from 'react'
import {
  Layout as MakerLayout,
  Header,
  Navbar,
  SideNav,
  MobileMenu,
  Content,
  Main,
} from 'maker-ui'

import { options } from '../config/options'
import { menu } from '../config/menus'
import { styles } from '../config/styles'
import { Search } from './Search'
import { NavWidgets } from './NavWidgets'
import { PostNavigation } from './PostNavigation'

const Layout = ({ children }) => {
  return (
    <MakerLayout options={options} styles={styles}>
      <Header>
        <Navbar menuArea={<Search />} navArea={<NavWidgets />} />
        <MobileMenu menu={menu} />
      </Header>
      <Content>
        <SideNav menu={menu} />
        <Main>
          <>
            {children}
            <PostNavigation />
          </>
        </Main>
      </Content>
    </MakerLayout>
  )
}

export default Layout
