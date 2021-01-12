import * as React from 'react'
import { Div, Section, Deez } from 'maker-ui'

const IndexPage = () => {
  // const responsiveArray = ['10px', '20px']

  // console.log(setBreakpoint(1, responsiveArray))

  return (
    <>
      <h1>Component Showcase!</h1>
      <Deez
        breakpoints={[800, 200]}
        _css={{
          position: 'relative',
          background: ['blue', 'red', 'purple'],
          color: ['green', 'purple'],
        }}>
        Deez tests
      </Deez>
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
      <Div sx={{ height: 5000 }}>test</Div>
    </>
  )
}

export default IndexPage
