import * as React from 'react'
import { Div, Section } from 'maker-ui'

const IndexPage = () => {
  // const responsiveArray = ['10px', '20px']

  // console.log(setBreakpoint(1, responsiveArray))

  return (
    <>
      <h1>Component Showcase!</h1>
      <div>
        Anoter title
        <h4>Subtitle</h4>
        <a href="/">Google</a>
      </div>
      <Section
      // bg={() => {
      //   console.log(setBreakpoint(1, ['blue', 'green', 'red', 'purple']))
      //   return setBreakpoint(1, ['blue', 'green', 'red', 'purple'])
      // }}
      >
        <h2>Test</h2>
      </Section>
      <Div css={{ height: 5000 }}>test</Div>
    </>
  )
}

export default IndexPage
