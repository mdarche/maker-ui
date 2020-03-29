import React from 'react'
import { Template } from 'elements-ui'
import { SEOProvider } from '@maker-ui/seo'

import options from './options'
import theme from './theme'

const menu = [
  { label: 'Carousel', path: '/carousel' },
  { label: 'Tabs', path: '/tabs' },
  { label: 'Accordion', path: '/accordion' },
  { label: 'Generative', path: '/generative' },
  { label: 'Tree Menu', path: '/tree-menu' },
  { label: 'Modal', path: '/modal' },
  { label: 'Lightbox', path: '/lightbox' },
]

const seo = {
  title: 'Components',
  description: 'Check out the Elements UI component showcase.',
  twitter: 'mkdarshay',
  titleTemplate: ' | Alpha UI',
  siteUrl: 'http://localhost:8000',
}

export default ({ children, location }) => (
  <SEOProvider base={seo}>
    <Template
      options={options}
      theme={theme}
      menu={menu}
      pathname={location.pathname}
      logo="Components Demo">
      {children}
    </Template>
  </SEOProvider>
)
