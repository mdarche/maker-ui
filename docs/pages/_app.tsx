import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { preToCodeBlock } from 'mdx-utils'
import '@fontsource/inter'

import Layout from '../components/Layout'
import { CodeBlock } from '../components/CodeBlock'

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
