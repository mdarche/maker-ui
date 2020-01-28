import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Sidebar,
  Footer,
} from 'elements-ui'
import { Box } from 'react-understudy'
import Logo from '../../components/Logo'

import { menuItems } from './options'
import theme from './theme'

export default props => (
  <Layout theme={theme}>
    <Header>
      <Navbar menu={menuItems} logo={<Logo />} />
      <MobileMenu />
    </Header>
    <Content sx={{ pt: 4 }}>
      <Sidebar>
        <Box height="400px" />
      </Sidebar>
      <Main>{props.children}</Main>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
)
