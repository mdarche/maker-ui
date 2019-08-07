/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

// TODO - rebuild this with MDX

const links = [
  { label: "Getting Started", path: "/getting-started" },
  { label: "Theme.js", path: "/theme-js" },
  { label: "Options.js", path: "/options-js" },
  {
    label: "Layout Components",
    path: "layout-components",
    nested: [
      { label: "Topbar", path: "/components/topbar" },
      { label: "Header", path: "/components/header" },
      { label: "Logo", path: "/components/logo" },
      { label: "NavMenu", path: "/components/nav-menu" },
      { label: "HeaderWidgets", path: "/components/header-widgets" },
      { label: "MenuToggle", path: "/components/menu-toggle" },
      { label: "ColorToggle", path: "/components/color-toggle" },
      { label: "MobileNav", path: "/components/mobile-nav" },
      { label: "ContentWrapper", path: "/components/content-wrapper" },
      { label: "Main", path: "/components/main" },
      { label: "Sidebar", path: "/components/sidebar" },
      { label: "SideNav", path: "/components/side-nav" },
      { label: "SideNavToggle", path: "/components/side-nav-toggle" },
      { label: "Footer", path: "/components/footer" },
      { label: "FooterWidgets", path: "/components/footer-widgets" },
      { label: "TabBar", path: "/components/tab-bar" },
    ],
  },
  { label: "Sample Layouts", path: "/sample-layouts" },
  { label: "Templates", path: "/templates" },
  { label: "Adding Content", path: "/adding-content" },
  { label: "Hooks", path: "/hooks" },
  { label: "Motivation", path: "/motivation" },
  { label: "Contribute", path: "/contribute" },
]

export default () => (
  <ul
    sx={{
      fontFamily: "heading",
      lineHeight: 2.3,
      fontSize: 2,
      a: { textDecoration: "none", color: "primary" },
      "ul li": {
        pl: 3,
      },
    }}>
    {links.map(({ label, path, nested }) => (
      <li
        key={path}
        sx={{
          p: "10px 30px",
          borderBottom: "1px solid",
          borderColor: "border",
          boxShadow: "inset -1px -2px 0px rgba(0, 0, 0, 0.01)",
        }}>
        <Link to={path}>{label}</Link>
        {nested ? (
          <ul>
            {nested.map(({ label, path }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    ))}
  </ul>
)
