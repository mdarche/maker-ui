import React from 'react'
import Link from 'next/link'

export default function IndexPage() {
  return (
    <>
      <h1>Page 2</h1>
      <p>Welcome to Page 2 of Maker UI's NextJS example</p>
      <Link href="/">
        <a>Go to back to Home Page</a>
      </Link>
    </>
  )
}
