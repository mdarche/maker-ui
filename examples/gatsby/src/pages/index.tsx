import React from 'react'
import { Link } from 'gatsby'

const IndexPage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome to the Maker-UI Gatsby example</p>
      <Link to="/page-2">Go to page 2</Link>
    </>
  )
}

export default IndexPage
