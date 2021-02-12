# Maker UI

> This project is currently in active development and the API is subject to frequent changes.

> If you arrived here from the Gatsby Theme Store, Gatsby Theme Elements is no longer supported and has now become a React component library.

Build React apps with a responsive layout system powered by [Emotion](https://emotion.sh/docs/introduction).

Maker UI helps you design accessible, responsive apps that can be customized in an infinite number of ways. Use it to quickly prototype and deploy a polished layout so you can focus on developing great content or adding new features to your project.

[![Version][version]][npm]
![MIT License][license]

[version]: https://flat.badgen.net/npm/v/maker-ui
[npm]: https://npmjs.com/package/maker-ui
[license]: https://flat.badgen.net/badge/license/MIT/blue

https://maker-ui.com

## Templating Features

- 9 customizable desktop header layouts
- 4 customizeable mobile header layouts
- 10+ content layouts
- Responsive header and side navigation
- Accessible dropdown menus
- Automatic skiplink and keyboard focus management
- Conditial or multi-layout support
- Unlimited color modes
- Error boundaries, logging support, and custom error reporting hooks
- JSX primitives that support responsive `css` arrays

## Getting Started

```sh
npm i maker-ui
```

Maker UI uses a configuration object and optional custom components to build complex layouts in seconds. Your custom options configuration determines how each layout should behave and appear.

See the documentation for more details on setting up your project.

### Layout Components

If your design requires more customization or if you need conditional layouts depending on a page route or variable, you can build with Maker UI's layout components:

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
} from 'maker-ui'

import { options, menu } from './config'
import Logo from './Logo'

const MyLayout = props => (
  <Layout options={options}>
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

export default MyLayout
```

### Responsive Styles

All layout components and JSX primitives can be styled with the responsive `css` and `breakpoints` props.

```jsx
import { Div } from 'maker-ui'

const MyPage = props => (
  <Div
    breakpoints={['768px', '960px',]}
    css={{ color: ['red', 'blue', 'green']}}
  />
  ...
  )
```

This example would set the Div's default color to `red` and generate `min-width` media queries so the color is `blue` at `768px` and `green` at `960px`. Never write a media query again!

## Maker Components

Maker UI also has an optional package `@maker-ui/components` that exports a variety of common components you might need for your site:

- Carousel
- Accordion
- Modal
- Lightbox
- Tabs
- Announcement
- TreeMenu
- FadeBox (scroll reveal)
- Popover, Tooltip, and Dropdown
- Spinner
- CookieNotice
- Toast and ToastProvider

## Documentation

- [MakerUI Options](https://maker-ui.com/docs/options)
- [Layout Components](https://maker-ui.com/docs/layout)
- [Adding Content](https://maker-ui.com/docs/adding-content)
- [Hooks API](https://maker-ui.com/docs/hooks)
- [Tutorials](https://maker-ui.com/tutorials)

## Upcoming Packages/Modules

- Components
  - Search (Algolia)
  - SmartTable
  - SmartGrid
  - Subscribe Form
  - Share buttons
  - Mega dropdown menus
  - Speech Synthesis
  - PricingTable
  - ParallaxBox
  - Subheader
- i18n Provider
- Pre-built themes
- Ecommerce & payment templates
- Authentication templates

## License

The MIT License (MIT)
