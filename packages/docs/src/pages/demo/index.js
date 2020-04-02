import React from 'react'
import { Template } from 'maker-ui'
import { BlogPost } from 'react-understudy'

import Logo from '../../components/Logo'
import Widgets from '../../components/Widgets'
import { menu, theme, Footer } from '../../components/Demo'

const options = {
  navigation: 'basic',
  layout: 'content',
}

export default () => (
  <Template
    options={options}
    theme={theme}
    menu={menu}
    logo={<Logo />}
    headerWidgets={<Widgets />}
    footer={<Footer />}>
    <BlogPost paragraphs={6} image={false} />
  </Template>
)
