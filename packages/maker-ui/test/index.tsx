// import React from 'react'
// import renderer from 'react-test-renderer'
// // import { cleanup } from '@testing-library/react'
// import { matchers } from 'jest-emotion'
// import {
//   Layout,
//   Topbar,
//   Header,
//   Navbar,
//   MobileMenu,
//   Content,
//   Main,
//   SideNav,
//   Sidebar,
//   Footer,
//   Section,
//   Box,
// } from '../src/components'

// expect.extend(matchers)
// // afterEach(cleanup)

// const renderJSON = e => renderer.create(e).toJSON()

// // Remove skiplinks for testing individual components

// const Provider = ({ children, ...props }) => (
//   <Layout options={{ a11y: { skiplinks: false } }} {...props}>
//     {children}
//   </Layout>
// )

// const theme = {
//   colors: {
//     bg_header: '#000',
//   },
//   fontSizes: [8, 10, 14, 18, 24, 32, 48, 64],
//   header: {
//     pt: '20px',
//   },
//   headerTest: {
//     pt: '30px',
//   },
// }

// const options = {
//   layout: 'sidebar-content',
//   header: {
//     sticky: false,
//   },
//   a11y: {
//     skiplinks: false,
//   },
// }

// describe('Layout', () => {
//   test('renders', () => {
//     const json = renderJSON(<Layout>Hi</Layout>)
//     expect(json).toMatchSnapshot()
//   })

//   test('renders without skiplinks', () => {
//     const json = renderJSON(<Layout options={options}>Hello</Layout>)
//     expect(json).toMatchSnapshot()
//   })

//   test('user theme overrides default theme', () => {
//     const json = renderJSON(
//       <Layout options={options} theme={theme}>
//         <Box sx={{ fontSize: 1 }} />
//       </Layout>
//     )
//     expect(json).toHaveStyleRule('font-size', '10px')
//   })

//   test('user options override default options', () => {
//     const json = renderJSON(
//       <Layout options={options}>
//         <Content />
//       </Layout>
//     )
//     expect(json).toHaveStyleRule('display', 'grid')
//   })
// })

// // Uses header component to test integration with Theme UI components

// describe('Header', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Header>Test</Header>
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })

//   test('renders with sx prop', () => {
//     const json = renderJSON(
//       <Provider>
//         <Header sx={{ mb: '10px' }} />
//       </Provider>
//     )
//     expect(json).toHaveStyleRule('margin-bottom', '10px')
//   })

//   test('renders with default variant namespace', () => {
//     const json = renderJSON(
//       <Provider theme={theme}>
//         <Header>Test</Header>
//       </Provider>
//     )
//     expect(json).toHaveStyleRule('padding-top', '20px')
//   })

//   test('renders with custom variant', () => {
//     const json = renderJSON(
//       <Provider theme={theme}>
//         <Header variant="headerTest">Test</Header>
//       </Provider>
//     )
//     expect(json).toHaveStyleRule('padding-top', '30px')
//   })

//   test('renders with prop override', () => {
//     const json = renderJSON(
//       <Layout options={options}>
//         <Header sticky>Test</Header>
//       </Layout>
//     )
//     expect(json).toHaveStyleRule('position', 'sticky')
//   })
// })

// describe('Navbar', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Navbar />
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })

//   test('renders with type prop override', () => {
//     const json = renderJSON(
//       <Provider>
//         <Navbar type="reverse" />
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })

// describe('Topbar', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Topbar />
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })

// describe('MobileMenu', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Header>
//           <MobileMenu />
//         </Header>
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })

// describe('Content', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Content />
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })

// describe('Main', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Content>
//           <Main>Test</Main>
//         </Content>
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })
// describe('Sidebar', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Content>
//           <Sidebar />
//           <Main />
//         </Content>
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })
// describe('SideNav', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <SideNav />
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })

// describe('Footer', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Footer />
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })

// describe('Section', () => {
//   test('renders', () => {
//     const json = renderJSON(
//       <Provider>
//         <Section>Test</Section>
//       </Provider>
//     )
//     expect(json).toMatchSnapshot()
//   })
// })
