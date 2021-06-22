import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { preToCodeBlock } from 'mdx-utils'
import '@fontsource/inter'

import Layout from '../components/Layout'
import { CodeBlock } from '../components/CodeBlock'
import { DocsLink } from '../components/DocsLink'
import { Callout } from '../components/Callout'

const components = {
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    if (props) {
      return <CodeBlock {...props} />
    } else {
      return <pre {...preProps} />
    }
  },
  table: tableProps => (
    <div className="table-wrapper">
      <table {...tableProps} />
    </div>
  ),
  a: anchorProps => <DocsLink {...anchorProps} />,
  Callout,
}

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Layout>
  )
}
