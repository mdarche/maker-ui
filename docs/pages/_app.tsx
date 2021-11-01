/* eslint-disable react/display-name */
import * as React from 'react'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import { preToCodeBlock } from 'mdx-utils'
import { Grid } from 'maker-ui'
import '@docsearch/css'

import Layout from '../components/Layout/Layout'
import { CodeBlock } from '../components/CodeBlock'
import { DocsLink } from '../components/DocsLink'
import { Callout } from '../components/Callout'
import { H2, H3, H4 } from '../components/Headings'
import { SEO } from '../components/SEO'
import { Diagram } from '../components/Diagram'
import { Type } from '../components/Type'
import { DefaultValue } from '../components/DefaultValue'

const components = {
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    if (props) {
      return <CodeBlock {...props} />
    } else {
      return <pre {...preProps} />
    }
  },
  table: (tableProps) => (
    <div className="table-wrapper">
      <table {...tableProps} />
    </div>
  ),
  a: (anchorProps) => <DocsLink {...anchorProps} />,
  Callout,
  h2: (h2Props) => <H2 {...h2Props} />,
  h3: (h3Props) => <H3 {...h3Props} />,
  h4: (h4Props) => <H4 {...h4Props} />,
  SEO: (seoProps) => <SEO {...seoProps} />,
  Grid: (gridProps) => <Grid {...gridProps} />,
  Diagram: (diagramProps) => <Diagram {...diagramProps} />,
  Type: (typeProps) => <Type {...typeProps} />,
  DefaultValue: (valueProps) => <DefaultValue {...valueProps} />,
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Maker UI - Build Anything</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Layout>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </>
  )
}
