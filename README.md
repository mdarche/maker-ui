# Maker UI

Build React apps with a responsive layout system powered by [Emotion](https://emotion.sh/docs/introduction).

Maker UI helps you design accessible, responsive apps that can be customized in any way imaginable. Quickly deploy a production-ready layout so you can focus on creating content and adding new features to your project.

[![Version][version]][npm]
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[version]: https://flat.badgen.net/npm/v/maker-ui
[npm]: https://npmjs.com/package/maker-ui

## Templating Features

- Fully customizable CSS Grid-based desktop and mobile header layouts
- 10+ common page layouts
- Responsive navigation
- Accessible dropdown menus
- Skiplink and keyboard focus management
- Unlimited color modes
- Error boundaries and custom error reporting hooks
- JSX primitives that support responsive `css` arrays

## Getting Started

```sh
npm i maker-ui
```

or

```sh
yarn maker-ui
```

Maker UI uses a configuration object to build complex layouts in seconds. Your custom configuration determines how each layout should behave and appear.

See the documentation for more details on setting up your project.

### Layout Components

At the root of your project or on a specific page, import and build with Maker UI's layout components:

```jsx
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

// basic sidebar-content layout
const SidebarLayout = (props) => (
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
 * @media (min-width: 768px) {
 *    color: blue;
 * }
 * @media (min-width: 960px) {
 *    color: green;
 * }
}*/

<Div breakpoints={[768, 960]} css={{ color: ['red', 'blue', 'green'] }}>
  Hello world
</Div>
```

This example would set the div's default color to `red` and generate `min-width` media queries so the color is `blue` at `768px` and `green` at `960px`. Never write a media query again!

## Maker UI Components

Maker UI ships a varity of optional packages for common components that you can use on your site. All packages are styled without opinions and buit with a11y best practices in mind:

| Component       | Package                 | Description                                                                                    |
| --------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| Accordion       | @maker-ui/accordion     | A fully customizable Accordion comoponent.                                                     |
| Announcement    | @maker-ui/notifications | An announcement banner that can be dismissed.                                                  |
| Carousel        | @maker-ui/gsap          | A Greensock based carousel that accepts fully custom slide components.                         |
| CookieNotice    | @maker-ui/notifications | A cookie notice that appears after a custom interval.                                          |
| Dropdown        | @maker-ui/popovers      | A dropdown menu component.                                                                     |
| Form            | @maker-ui/forms         | A wrapper for Formik that makes building grid-based forms with custom inputs even easier.      |
| Generate        | @maker-ui/generative    | Wrapper components and utility functions that return randomly ordered or generated components. |
| Lightbox        | @maker-ui/lightbox      | A lightbox modal for individual triggers or a media gallery.                                   |
| Modal           | @maker-ui/modal         | A full-screen accesible overlay component that can be triggered by a `useState` hook.          |
| Parallax        | @maker-ui/gsap          | A Parallax background section.                                                                 |
| Popover         | @maker-ui/popovers      | A simple popover component that is used to power the Dropdown and Tooltip components.          |
| ScrollReveal    | @maker-ui/gsap          | Staggered viewport entrance animations.                                                        |
| Spinner         | @maker-ui/loaders       | A collection of SVG loading spinners.                                                          |
| TableOfContents | @maker-ui/toc           | An interactive menu that scans for heading tags and creates on-page links.                     |
| Tabs            | @maker-ui/tabs          | A customizable tabs component.                                                                 |
| Tooltip         | @maker-ui/popovers      | A popover that is triggered on hover or focus to show supplemental information.                |

You can also import `@maker-ui/elements` to bundle the most commonly used `@maker-ui/accordion`, `@maker-ui/tabs`, `@maker-ui/popovers`, and `@maker-ui/modal`.

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
