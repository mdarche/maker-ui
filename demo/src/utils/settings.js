/** @jsx jsx */
import { jsx } from "theme-ui"

const Box = () => (
  <div sx={{ height: 30, width: 30, m: "auto", mb: 10, bg: "#e2e2e2" }} />
)
// Main navigation menu
export const menuItems = [
  {
    label: "Default",
    path: "/",
    icon: <Box />,
  },
  {
    label: "Side Nav",
    path: "/sidenav",
    icon: <Box />,
  },
  {
    label: "Sidebar Left",
    alt: "SB Left",
    path: "/left-sidebar",
    icon: <Box />,
  },
  {
    label: "Sidebar Right",
    alt: "SB Right",
    path: "/right-sidebar",
    icon: <Box />,
  },
  {
    label: "Full Width",
    alt: "Full",
    path: "/full-width",
    icon: <Box />,
  },
]

// Custom style object for changing svg logo colors in different color modes
// Learn more in the Logo docs

export const logoColors = {
  dark: {
    ".logo-blue": { fill: "red" },
    ".logo-red": { fill: "red" },
    ".logo-green": { fill: "red" },
    ".logo-yellow": { fill: "red" },
    ".logo-text": { fill: "red" },
  },
  purple: {
    ".logo-blue": { fill: "red" },
    ".logo-red": { fill: "red" },
    ".logo-green": { fill: "red" },
    ".logo-yellow": { fill: "red" },
    ".logo-text": { fill: "red" },
  },
}
