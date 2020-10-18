import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
} from 'maker-ui'

import { theme } from '../config/theme'
import { options } from '../config/options'

const App = ({ children }) => {
  return (
    <Layout theme={theme} options={options}>
      <Header>
        <Navbar />
        <MobileMenu />
      </Header>
      <Content>
        <Main>{children}</Main>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

// TODO - Add heading and image tags to primitive

export default App
