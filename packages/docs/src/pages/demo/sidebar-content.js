import React from 'react'
import { Template } from 'elements-ui'
import { BlogPost, SideAds } from 'react-understudy'

import Logo from '../../components/Logo'
import Widgets from '../../components/Widgets'
import { menu, theme, Footer } from '../../components/Demo'

const options = {
  navigation: 'basic',
  layout: 'sidebar-content',
}

export default () => (
  <Template
    options={options}
    theme={theme}
    menu={menu}
    logo={<Logo />}
    headerWidgets={<Widgets />}
    sidebar={<SideAds adHeights={[250, 600]} />}
    footer={<Footer />}>
    <BlogPost paragraphs={6} image={false} />
  </Template>
)
