/* eslint-disable react/display-name */
import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { preToCodeBlock } from 'mdx-utils'

import Layout from '../components/Layout/Layout'
import { CodeBlock } from '../components/CodeBlock'
import { DocsLink } from '../components/DocsLink'
import { Callout } from '../components/Callout'
import { H2, H3, H4, HeadingProps } from '../components/Headings'

const components = {
  // eslint-disable-next-line prettier/prettier
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    if (props) {
      return <CodeBlock {...props} />
    } else {
      return <pre {...preProps} />
    }
  },
  // eslint-disable-next-line prettier/prettier
  table: (tableProps) => (
    <div className="table-wrapper">
      <table {...tableProps} />
    </div>
  ),
  // eslint-disable-next-line prettier/prettier
  a: (anchorProps) => <DocsLink {...anchorProps} />,
  Callout,
  h2: (h2Props: HeadingProps) => <H2 {...h2Props} />,
  h3: (h3Props: HeadingProps) => <H3 {...h3Props} />,
  h4: (h4Props: HeadingProps) => <H4 {...h4Props} />,
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
