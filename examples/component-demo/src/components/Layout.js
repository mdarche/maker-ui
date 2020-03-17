import React from 'react'
import { Template } from 'elements-ui'

import options from './options'
import theme from './theme'

const menu = [
  { label: 'Home', path: '/' },
  { label: 'Carousel', path: '/carousel' },
  { label: 'Tabs', path: '/tabs' },
  { label: 'Accordion', path: '/accordion' },
  { label: 'Generative', path: '/generative' },
  { label: 'Tree Menu', path: '/tree-menu' },
  { label: 'Modal', path: '/modal' },
]

export default ({ children, location }) => (
  <Template
    options={options}
    theme={theme}
    menu={menu}
    pathname={location.pathname}
    logo="Components Demo">
    {children}
  </Template>
)
