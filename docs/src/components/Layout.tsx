import * as React from 'react'
import {
  Layout as MakerUILayout,
  Header,
  Navbar,
  Content,
  SideNav,
  Main,
} from 'maker-ui'

import { options } from '../config/options'

export const Layout = ({ children, location }) => {
  return (
    <MakerUILayout options={options}>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <SideNav />
        <Main>{children}</Main>
      </Content>
    </MakerUILayout>
  )
}
