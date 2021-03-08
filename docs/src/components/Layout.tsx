import * as React from 'react'
import {
  Layout as MakerLayout,
  Header,
  Navbar,
  Content,
  SideNav,
  MobileMenu,
  Main,
} from 'maker-ui'

import { Logo } from './Logo'
import { options } from '../config/options'
import { sideMenu, navMenu } from '../config/menus'

export default ({ children, location }) => {
  return (
    <MakerLayout options={options}>
      <Header>
        <Navbar logo={<Logo />} menu={navMenu} />
        {/* <MobileMenu menu={navMenu} /> */}
      </Header>
      <Content>
        <SideNav menu={sideMenu} />
        <Main>{children}</Main>
      </Content>
    </MakerLayout>
  )
}
