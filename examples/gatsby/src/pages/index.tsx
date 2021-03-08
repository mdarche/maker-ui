import * as React from 'react'
import { Link } from 'gatsby'
import { Div } from 'maker-ui'

const IndexPage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome to the Maker-UI Gatsby example</p>
      <Link to="/page-2">Go to page 2</Link>
      <Div css={{ color: ['red', 'green'] }}>Div text</Div>
    </>
  )
}

export default IndexPage
