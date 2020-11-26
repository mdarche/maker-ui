import * as React from 'react'
import { Div, Section } from 'maker-ui'

const IndexPage = () => {
  return (
    <>
      <h1>Component Showcase!</h1>
      <div>
        Anoter title
        <h4>Subtitle</h4>
        <a href="/">Google</a>
      </div>
      <Section>
        <h2>Test</h2>
      </Section>
      <Div sx={{ height: 5000 }}>test</Div>
    </>
  )
}

export default IndexPage
