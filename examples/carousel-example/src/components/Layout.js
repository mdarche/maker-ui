import React from 'react'
import { Template } from 'elements-ui'

import options from './options'
import theme from './theme'

const menu = [
  { label: 'Basic Usage', path: '/' },
  { label: 'Image Slider', path: '/image-slider' },
]

export default ({ children, location }) => (
  <Template
    options={options}
    theme={theme}
    menu={menu}
    pathname={location.pathname}
    logo="Carousel Example">
    {children}
  </Template>
)
