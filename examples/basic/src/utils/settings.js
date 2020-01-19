/** @jsx jsx */
import { jsx } from "theme-ui"

// Main navigation menu

export const menuItems = [
  {
    label: "Default",
    path: "/",
  },
  {
    label: "Side Nav",
    path: "/sidenav",
  },
  {
    label: "Sidebar Left",
    alt: "SB Left",
    path: "/left-sidebar",
  },
  {
    label: "Sidebar Right",
    alt: "SB Right",
    path: "/right-sidebar",
  },
  {
    label: "Full Width",
    alt: "Full",
    path: "/full-width",
  },
]

// Custom style object for changing Logo color modes

export const logoColors = {
  dark: {
    ".logo-blue": { fill: "#afa7fe" },
    ".logo-red": { fill: "#3bcec5" },
    ".logo-green": { fill: "#ffa6c8" },
    ".logo-yellow": { fill: "#acd26b" },
    ".logo-text": { fill: "#fff" },
  },
  silly: {
    ".logo-blue": { fill: "#43bd56" },
    ".logo-red": { fill: "#4f86ff" },
    ".logo-green": { fill: "#ffdc00" },
    ".logo-yellow": { fill: "#d400ff" },
    ".logo-text": { fill: "#3c76f3" },
  },
}
