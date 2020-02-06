![Elements Logo](https://i.imgur.com/kjm5Akl.png)

# Elements UI

Build React apps with a responsive layout system powered by [Theme UI](https://theme-ui.com/).

Elements UI helps you design accessible, responsive page templates that can be customized in an infinite number of ways. Use Elements to quickly deploy a polished site layout so you can focus on developing great content or adding new integrations to your site.

Elements UI extends all of Theme UI's core features so you can easily migrate your existing theme.

[![npm version](https://badge.fury.io/js/gatsby-theme-elements.svg)](https://badge.fury.io/js/gatsby-theme-elements)

https://elements-ui.dev

## Features

- 8 customizable headers
- 6 common page layouts
- Responsive header navigation
- Responsive side navigation
- Accessible dropdown menus
- Automatic skiplink and keyboard focus management
- Template component for plug-and-play layouts
- Multi-layout support
- Full Theme UI capabilities
  - Unlimited color modes
  - Responsive scales
  - Variant and `sx` prop support
  - MDX theming
  - 100% compatible with Theme UI components

All layout components can be fully customized to your needs with theme variants and the `sx` prop.

## Getting Started

```sh
npm i elements-ui
```

Elements UI uses two configuration objects and optional custom components to build your layouts. Your custom theme and options configurations determine how each layout component should behave and appear.

See the documentation on how to build a theme and configure your layout options.

### Template Component

To get a site up and running in less than 5 minutes, you can use the `Template` component. Simply import and supply your theme object, options object, menu array, and logo as props:

```jsx
// basic template usage
import React from 'react'
import { Template } from 'elements-ui'

import theme from './my-theme'
import options from './my-options'
import menu from './my-menu'
import Logo from './Logo'

export default props => (
  <Template theme={theme} options={options} menu={menu} logo={<Logo />}>
    {props.children}
  </Template>
)
```

The `Template` component accepts a variety of props for custom components like a sidebar, side nav, header widgets (ie. search or social media links), footer content, and much more. Check out the [Template docs](https://elements-ui.dev/docs/template) for details.

### Layout Components

If your design requires a bit more customization or if you need conditional layouts depending on a page route or variable, you can build with the Elements UI layout components:

```jsx
// basic layout component usage
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

import theme from './my-theme'
import options from './my-options'
import menu from './my-menu'
import Logo from './Logo'

export default props => (
  <Layout theme={theme} options={options}>
    <Header>
      <Navbar logo={<Logo />} menu={menu} />
      <MobileMenu menu={menu} />
    </Header>
    <Content>
      <Main>{props.children}</Main>
      <Sidebar>Your custom sidebar component</Sidebar>
    </Content>
    <Footer>Your custom footer</Footer>
  </Layout>
)
```

All layout components can be styled with custom variants and the `sx` prop as specified in Theme UI's component library.

## Documentation

- [Design a Theme](https://elements-ui.dev/docs/theme)
- [Configure Options](https://elements-ui.dev/docs/options)
- [Layout Components](https://elements-ui.dev/docs/layout-components)
- [Template Component](https://elements-ui.dev/docs/template)
- [Customizing Styles](https://elements-ui.dev/docs/styling)
- [Adding Content](https://elements-ui.dev/docs/adding-content)
- [API](https://elements-ui.dev/docs/api)
- [Tutorials](https://elements-ui.dev/tutorials)
- [License](#license)

## Coming Soon

- Common UI components
  - Image / video lightbox
  - Carousel slider
  - Reusable modal layer
  - On-page search
  - Site search (Algolia)
  - Responsive tables
  - Filterable grids
  - Scroll reveal wrapper
- Pre-built themes
- Ecommerce & payment layouts
- Authentication layouts
- [Blocks Editor](https://blocks-ui.com) compatibility

## License

The MIT License (MIT)
