/* eslint-disable react/display-name */
import * as React from 'react'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import { preToCodeBlock } from 'mdx-utils'

import '@docsearch/css'

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
    <>
      <Head>
        <title>Maker UI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
        /> */}
      </Head>
      <Layout>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
      <script
        async
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
      />
      <script
        async
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `docsearch({
apiKey: '375203709e8b66acf3df920a0129ecc4',
indexName: 'maker-ui',
inputSelector: '#doc-search',
debug: false // Set debug to true if you want to inspect the dropdown
});`,
        }}
      />
    </>
  )
}
