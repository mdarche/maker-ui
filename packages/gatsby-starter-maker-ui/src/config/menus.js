/**
 *  NOTE
 *
 *  This menu demonstrates all of the options you can use with a menu array for Maker UI <Navbar />,
 *  <MobileMenu />, or <AccordionMenu />:
 *    - nested menu (submenu)
 *    - open in new tab
 *    - custom classes
 *    - custom icon
 *
 *  See: https://maker-ui.dev/menus for details
 */
import React from 'react'

const HelpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="18"
    width="18"
    viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </svg>
)

export const menu = [
  { label: 'Home', path: '/', classes: 'custom-class' },
  {
    label: 'Help',
    path: '#',
    icon: <HelpIcon />,
    submenu: [
      {
        label: 'Navigation',
        path: 'https://maker-ui.dev/navigation',
        newTab: true,
      },
      {
        label: 'Layouts',
        path: 'https://maker-ui.dev/layouts',
        newTab: true,
      },
      {
        label: 'Options',
        path: 'https://maker-ui.dev/options',
        newTab: true,
      },
      { label: 'Theme', path: 'https://maker-ui.dev/theming', newTab: true },
    ],
  },
]
