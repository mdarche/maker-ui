![Elements Logo](https://i.imgur.com/kjm5Akl.png)

# Gatsby Theme Elements

Build responsive Gatsby themes with layouts powered by [Theme UI](https://theme-ui.com/).

Gatsby Theme Elements takes care of accessible layouts, responsive navigation, and theming so you can focus on creating awesome content or adding new integrations to your Gatsby site.

[![npm version](https://badge.fury.io/js/gatsby-theme-elements.svg)](https://badge.fury.io/js/gatsby-theme-elements)

Preview: https://gatsby-theme-elements.netlify.com/

Documentation: https://elements-docs.netlify.com/

## NOTE

I am currently moving all of GTE's layout components to a new component library built on top of Theme UI. You will be able to use this project with any React framework under the name `elements-ui`.

Stay tuned for updates!

## Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
  - [theme.js](#themejs)
  - [options.js](#optionsjs)
- [Layout Components](#layout-components)
  - [Styling](#styling)
  - [Usage](#usage)
- [Adding Content](#adding-content)
- [Hooks](#hooks)
- [License](#license)

## Getting Started

To install Elements, first download the theme:

```sh
npm i --save gatsby-theme-elements
```

or

```sh
yarn add gatsby-theme-elements
```

In your `gatsby-config.js` file, add:

```sh
module.exports = {
  plugins: ['gatsby-theme-elements'],
}
```

## Installation

Elements creates your default layout settings by shadowing two configuration files: `options.js` and `theme.js`.

Create a new folder in your project's `/src` directory called `gatsby-theme-elements` and add these two files:

### `theme.js`

_Acts as a wrapper for [ThemeUI](https://theme-ui.com/)_

Use `theme.js` to export your theme object without having to shadow `gatsby-plugin-theme-ui` in your project directory. With [ThemeUI](https://theme-ui.com/), you might:

- Add fonts with [Typography.js](https://kyleamathews.github.io/typography.js/)
- Declare variants
- Set infinite color modes
- Create [MDX](https://mdxjs.com/) styles
- Create sizing scales

Elements uses a few custom [ThemeUI](https://theme-ui.com/) properties to control default layout styles. Add the following colors and shadows to your theme object:

```jsx

colors: {
    border: "",            // Theme border color
    bg_topbar: "",         // Topbar background
    bg_header: "",         // Header background
    bg_mobilenav: "",      // MobileNav background
    bg_sidenav: "",        // SideNav background
    bg_tabbar: "",         // TabBar background
    bg_footer: "",         // Footer background
    text_navlink: "",      // Header link color
    text_topbar: "",       // Topbar text color
},
shadows: {
    header: "",            // Header shadow
    tabbar: "",            // TabBar shadow
  }
```

If you need to change these values for different layouts, you can always override them at the component level.

### `options.js`

_Handles all positioning and DOM measurements_

This file lets you set things like widths, scroll behaviors, breakpoints, and animation springs. A complete `options.js` file looks like this:

```jsx
export default {
  topbar: {
    sticky: true,
    maxWidth: 1260,
  },
  header: {
    sticky: true,
    stickyMobile: true,
    maxWidth: 1260,
    mobileNavWidth: 300,
    mobileAnimation: 'fade', // fade, fadeInUp, fadeInDown, slideRight, slideLeft
    spring: { tension: 170, friction: 26 }, // React Spring config object for your MobileNav
  },
  sideNav: {
    width: '18em',
    spring: { tension: 170, friction: 26 }, // spring config for your responsive SideNav
  },
  content: {
    maxWidth: 1020,
    gridGap: 30,
  },
  sidebar: {
    width: '.3fr',
  },
  footer: {
    maxWidth: 1020,
    gridGap: 30,
  },
  breakpoints: {
    sm: 750,
    md: 960,
    lg: 1240,
  },
}
```

**NOTE:** Set your breakpoints in `options.js`, not your [ThemeUI](https://theme-ui.com/) object. Elements currently uses these breakpoint values for layout calculations.

## Layout Components

The Elements component library gives you access to all of the semantic markup you need to quickly build a state of the art website.

| Component          | Description                                                                                                                                                                                                                                                                    |
| ------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Layout**         | The root layout component **(required)**                                                                                                                                                                                                                                       |
| **Topbar**         | A topbar or status bar that sits above the site header                                                                                                                                                                                                                         |
| **Header**         | A flexible **header** element that wraps your primary navigation                                                                                                                                                                                                               |
| **Logo**           | A link that accepts a child or defaults to an optional shadowed logo file. To use <Logo /> without wrapping it around a child component, create a third file in your `gatsby-theme-elements` directory for a React component called `logo.js`.                                 |
| **NavMenu**        | The site's primary navigation _ul_ wrapped in a _nav_ element. Hides on mobile.                                                                                                                                                                                                |
| **MenuToggle**     | Button that accesses the **useMenu** hook to toggle a mobile menu. It comes with default hamburger and close icons or you can wrap it around your own.                                                                                                                         |
| **ColorToggle**    | Button that accesses [ThemeUI](https://theme-ui.com/)'s colorMode hook to cycle through colors. Defaults to the name of the current color or you can wrap it around your own icon.                                                                                             |
| **MobileNav**      | A fixed mobile wrapper component that can be configured to animate on mount. Triggered by **MenuToggle** or the **useMenu** hook.                                                                                                                                              |
| **ContentWrapper** | A wrapper that uses a layout prop to determine the position of its children. This component wraps **Main**, **Sidebar**, and **SideNav**.                                                                                                                                      |
| **Main**           | The layout's _main_ content element                                                                                                                                                                                                                                            |
| **Sidebar**        | The layout's sidebar component. Can be positioned left or right of **Main**.                                                                                                                                                                                                   |
| **SideNav**        | An optional fixed side navigation component. Can be positioned left or right of **Main**.                                                                                                                                                                                      |
| **TabBar**         | A fixed wrapper component that moves mobile navigation to the bottom of the screen like a native mobile app. You can wrap it around your own components or feed it a menu object. The TabBar formats this menu into a horizontal scrollable row with links, labels, and icons. |
| **Footer**         | The document _footer_ element                                                                                                                                                                                                                                                  |
| **FooterWidgets**  | A grid wrapper for building skiplink accessible footer columns                                                                                                                                                                                                                 |

### Usage

To use any of these components, just import them from `gatsby-theme-elements`:

```jsx
// basic usage
import { Layout, Header, ContentWrapper, Main, Footer } from 'gatsby-theme-elements`

```

Unlike other Gatsby themes, you don't need to shadow components because you can edit their behavior from your config files. Detailed information on each component is coming to a documentation site soon.

Components can be used independently, but they work best together in a layout tree like so:

```jsx
<Layout>
  <Header>
    <Logo />
    <NavMenu />
    <MobileNav />
    <MenuToggle />
    <ColorToggle />
  </Header>

  <ContentWrapper>
    <SideNav />
    <Main>{children}</Main>
  </ContentWrapper>

  <Footer>
    <FooterWidgets />
  </Footer>
</Layout>
```

### Styling

Layout components integrate seamlessly with [ThemeUI](https://theme-ui.com/)'s **`sx`** prop, so you can weave into and around them to build flexible containers or apply new styles.

By default, the layout components use the settings you defined in `options.js` and `theme.js`. This makes building new page layouts and child themes incredibly easy.

## Adding Content

Once you have designed a layout, all you have to do is wrap your page in the newly created layout component. If your app only requires one layout, you can do this with Gatsby's `wrapRootElement` function.

## Hooks

If you prefer to build your own layout components or access theme options from child themes, you can use the following hooks:

- useOptions
- useMenu
- useSideNav
- useMeasurements

### `useOptions`

**useOptions** returns an object with all of the theme options specified in `options.js`:

```jsx
import { useOptions } from "gatsby-theme-elements"

const Component = () => {
  const options = useOptions()

  return...
}
```

### `useMenu`

**useMenu** returns an array that lets you view and set the open / close status of the mobile nav

```jsx
import { useMenu } from "gatsby-theme-elements"

const Component = () => {
  const [menuActive, toggleMenu] = useMenu()

  return...
}
```

### `useSideNav`

**useSideNav** returns an array that lets you view and set the open / close status of the side nav. The **SideNav's** default status changes depending on the viewport width and your mobile breakpoint.

```jsx
import { useSideNav } from "gatsby-theme-elements"

const Component = () => {
  const [sideNavActive, toggleSideNav] = useSideNav()

  return...
}
```

### `useMeasurements`

**useMeasurements** returns an object with all of Element's key measurements:

- `topbarHeight`
- `headerHeight`
- `sideNavWidth`
- `sidebarWidth`
- `viewportHeight` (updates on resize)
- `viewportWidth` (updates on resize)

This might come in handy if you need to access screen dimensions or layout positions.

```jsx
import { useMeasurements } from "gatsby-theme-elements"

const Component = () => {
  const metrics = useMeasurements()

  return...
}
```

## License

The MIT License (MIT)

Created by [Mike Darche](https://twitter.com/Mkdarshay)
