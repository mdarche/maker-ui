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

import { options } from './options'

const App = ({ children }) => {
  return (
    <Layout options={options}>
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

export default App
