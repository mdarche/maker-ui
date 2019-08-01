![Elements Logo](http://darchedesign.com/wp-content/uploads/2019/08/elements-sm.png)


# Gatsby Theme Elements

Build responsive Gatsby themes with layouts powered by [ThemeUI](https://theme-ui.com/).

Gatsby Theme Elements takes care of accessibility, responsive navigation, and theming so you can focus on creating great content or adding new integrations.

https://gatsby-theme-elements.netlify.com/


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
- Set color modes
- Create [MDX](https://mdxjs.com/) styles
- Create sizing scales

Elements uses a few custom [ThemeUI](https://theme-ui.com/) properties to control default layout styles. Add the following colors and shadows to your theme settings:

```jsx

colors: {
    logo: "",              // SVG logo fill
    border: "",            // Theme border color
    bg_topbar: "",         // Topbar background
    bg_header: "",         // Header background
    bg_mobilenav: "",      // MobileNav background
    bg_sidenav: "",        // SideNav background
    bg_tabbar: "",         // TabBar background
    bg_footer: "",         // Footer background
    text_navlink: "",      // Header link color
    text_topbar: "",       // Topbar link color
},
shadows: {
    header: "",            // Header shadow
    tabbar: "",            // TabBar shadow
  }
```

If you need to change these values for different layouts, you can always override them at the component level.

### `options.js`

_Handles all positioning and measurements_

This file lets you set things like widths, scroll behaviors, breakpoints, and animation springs. A complete `options.js` export looks like this:

```jsx
  {
    topbar: {
      sticky: true,
      maxWidth: 1260,
    },
    header: {
      sticky: true,
      stickyMobile: true,
      maxWidth: 1260,
      mobileNavWidth: 300,
      mobileAnimation: "fade",
      spring: { tension: 170, friction: 26 },
    },
    sideNav: {
      width: "18em",
      spring: { tension: 170, friction: 26 },
    },
    content: {
      maxWidth: 1020,
      gridGap: 30,
    },
    sidebar: {
      width: ".3fr",
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

The Elements component library gives you access to all of the hooks and semantic markup you need to quickly build a state of the art website.

Although they can be used independently, the components work best together in a layout tree like so:

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
    <FooterWidgets/>
  </Footer>

</Layout>
```

Layout components work seamlessly with [ThemeUI](https://theme-ui.com/)'s `sx` prop, so you can weave into and around them to build flexible containers or apply new styles.

By default, the layout components use the settings you defined earlier. This makes building new page layouts and themes incredibly easy.

See a list of all components below:

| Component          | Description                                                                                                                              |
| ------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Layout**         | The root layout component (required)                                                                                                     |
| **Topbar**         | A topbar or status bar that sits above the header                                                                                        |
| **Header**         | A flexible **header** element that wraps primary navigation                                                                              |
| **Logo**           | A semantic link that accepts a child or defaults to an optional shadowed logo called `logo.svg`                                          |
| **NavMenu**        | The site's primary navigation **ul** wrapped in a **nav** element. Hidden on mobile                                                      |
| **MenuToggle**     | Button that accesses the **useMenu** hook to toggle a mobile menu                                                                            |
| **ColorToggle**    | Button that accesses [ThemeUI](https://theme-ui.com/)'s colorMode hook to cycle through colors                                           |
| **MobileNav**      | A fixed mobile wrapper component that can be configured to animate on mount. Triggered by **MenuToggle** or the **useMenu** hook         |
| **ContentWrapper** | A wrapper that uses a layout prop to determine the position of its children. This component wraps **Main**, **Sidebar**, and **SideNav** |
| **Main**           | The layout's **main** content element                                                                                                    |
| **Sidebar**        | The layout's sidebar compnent. Can be positioned left or right                                                                           |
| **SideNav**        | An optional fixed side navigation component. Can be positioned left or right of **Main**                                                 |
| **TabBar**         | A fixed wrapper component that moves mobile navigation to the bottom of the screen. This displays links with icons in a scrollable row   |
| **Footer**         | The document **footer** element                                                                                                          |
| **FooterWidgets**  | A grid wrapper for building footer columns                                                                                               |

### Usage

To use any of these components, just import them from `gatsby-theme-elements`:

```jsx
// basic
import { Layout, Header, ContentWrapper, Main, Footer } from 'gatsby-theme-elements`

```

Detailed information on each component and its props is coming to a documentation site soon.

## Hooks

If you prefer to build your own toggles or access theme options from child themes or custom components, you can use the following hooks:

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
- `viewportX` (updates on resize)
- `viewportY` (updates on resize)

This might come in handy if you need to access screen dimensions or layout positions.

```jsx
import { useMeasurements } from "gatsby-theme-elements"

const Component = () => {
  const metrics = useMeasurements()

  return...
}
```
