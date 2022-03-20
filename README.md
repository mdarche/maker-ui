# Maker UI

Build React apps with a responsive layout system powered by [Emotion](https://emotion.sh/docs/introduction).

Maker UI helps you design accessible, responsive apps that can be customized in an infinite number of ways. Use it to quickly prototype and deploy a polished layout so you can focus on developing great content or adding new features to your project.

[![Version][version]][npm]
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[version]: https://flat.badgen.net/npm/v/maker-ui
[npm]: https://npmjs.com/package/maker-ui

## Templating Features

- 9 customizable desktop header layouts
- 4 customizable mobile header layouts
- 10+ content layouts
- Responsive header and side navigation
- Accessible dropdown menus
- Automatic skiplink and keyboard focus management
- Conditional or multi-layout support
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
import * as React from 'react'
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

import { options, menu } from './config' // your custom configurations
import Logo from './Logo' // your logo component

const MyLayout = (props) => (
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
/** Equivalent CSS:
 * 
 * color: red;
 * @media screen and (min-width: 768px) {
 *    color: blue;
 * }
 * @media screen and (min-width: 960px) {
 *    color: green;
 * }
}*/

<Div breakpoints={[768, 960]} css={{ color: ['red', 'blue', 'green'] }}>
  Hello world
</Div>
```

This example would set the div's default color to `red` and generate `min-width` media queries so the color is `blue` at `768px` and `green` at `960px`. Never write a media query again!

## Maker Components

Maker UI also has an optional packages that export a variety of common components you might need for your site:

- Accordion
- Modal
- Lightbox
- Tabs
- Announcement
- Popover, Tooltip, and Dropdown
- Loading Spinners
- CookieNotice
- TableOfContents
- Carousel
- ParallaxSection
- ScrollReveal

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
