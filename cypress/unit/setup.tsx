import * as React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Footer,
  MakerUIOptions,
  MenuProps,
  Content,
  Main,
} from 'maker-ui'

const testMenu: MenuProps[] = [
  { label: 'Home', path: '/' },
  { label: 'Page 1', path: '/page-1' },
  { label: 'Page 2', path: '/page-2' },
]

interface WrapperProps {
  options?: MakerUIOptions
  styles?: object
  header?: boolean
  footer?: boolean
  content?: boolean
  children: React.ReactNode
}

// Utility wrapper that lets you change options or styles during each test.

export const Wrapper = ({
  options = {},
  styles,
  header,
  footer,
  content,
  children,
}: WrapperProps) => {
  return (
    <Layout options={options} styles={styles}>
      {header ? <TestHeader /> : null}
      {children}
      {content ? <TestContent /> : null}
      {footer ? <Footer>Footer</Footer> : null}
    </Layout>
  )
}

const TestHeader = () => (
  <Header>
    <Navbar logo="Logo" menu={testMenu} />
    <MobileMenu menu={testMenu} />
  </Header>
)

const TestContent = () => (
  <Content>
    <Main>Page Content</Main>
  </Content>
)
