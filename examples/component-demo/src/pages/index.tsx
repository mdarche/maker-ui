import * as React from 'react'
import { ColorButton, Div, Flex, Section } from 'maker-ui'

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
        // container={false}
        _css={{ background: 'blue' }}

        // bg={() => {
        //   console.log(setBreakpoint(1, ['blue', 'green', 'red', 'purple']))
        //   return setBreakpoint(1, ['blue', 'green', 'red', 'purple'])
        // }}
      >
        <h2>This is the section</h2>
        <ColorButton />
        <Flex>Test</Flex>
      </Section>
      <Div css={{ height: 5000 }}>test</Div>
    </>
  )
}

export default IndexPage
