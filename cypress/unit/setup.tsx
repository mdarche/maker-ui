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
export { defaultOptions as defaults } from './options'

export function format(value: any, index: number = 0): string {
  const val = Array.isArray(value) ? value[index] : value
  return isNaN(val) ? val : `${val}px`
}

// Don't link to other routes in unit tests -- @cypress/react doesn't support this
export const testMenu: MenuProps[] = [
  { label: 'Home', path: '#' },
  { label: 'Page 1', path: '#' },
  { label: 'Page 2', path: '#' },
]

export const nestedMenu: MenuProps[] = [
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

interface WrapperProps {
  options?: MakerUIOptions
  styles?: object
  header?: boolean
  footer?: boolean
  content?: boolean
  isFooter?: boolean
  isContent?: boolean
  children: React.ReactNode
}

// Utility wrapper that lets you change options or styles during each test.

export const Wrapper = ({
  options = {},
  styles,
  header,
  footer,
  content,
  isFooter,
  isContent,
  children,
}: WrapperProps) => {
  console.log('Options are ', options)
  return (
    <Layout options={options} styles={styles}>
      {header ? <TestHeader /> : null}
      {!isFooter && !isContent ? children : null}
      {isContent ? <InnerContent>{children}</InnerContent> : null}
      {content ? <TestContent /> : null}
      {footer ? <Footer>Footer</Footer> : null}
      {isFooter ? children : null}
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

const InnerContent = ({ children }) => (
  <Content>
    <Main>{children}</Main>
  </Content>
)
