import React from 'react'
import { Box } from 'theme-ui'
import renderer from 'react-test-renderer'
import { cleanup } from '@testing-library/react'
import { matchers } from 'jest-emotion'
import {
  Layout,
  Topbar,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  SideNav,
  Sidebar,
  Footer,
  Section,
} from '../src/components'

afterEach(cleanup)

expect.extend(matchers)

const renderJSON = e => renderer.create(e).toJSON()

const theme = {
  colors: {
    bg_header: '#000',
  },
}

const options = { navigation: 'sidebar-content' }

describe('Layout', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <h1>Test</h1>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })

  test('user theme overrides default values', () => {
    const json = renderJSON(
      <Layout theme={theme}>
        <Box sx={{ bg: 'bg_header' }}></Box>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })

  test('user options override default options', () => {
    const json = renderJSON(
      <Layout options={{ layout: 'content-sidebar' }}>
        <Content />
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Topbar', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Topbar>Test</Topbar>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Header', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Header>Test</Header>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Navbar', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Header>
          <Navbar />
        </Header>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('MobileMenu', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Header>
          <MobileMenu />
        </Header>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Content', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Content />
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Main', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Content>
          <Main>Test</Main>
        </Content>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})
describe('Sidebar', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Content>
          <Sidebar />
          <Main />
        </Content>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})
describe('SideNav', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <SideNav />
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Footer', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Footer />
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Section', () => {
  test('renders', () => {
    const json = renderJSON(
      <Layout>
        <Section>Test</Section>
      </Layout>
    )
    expect(json).toMatchSnapshot()
  })
})
