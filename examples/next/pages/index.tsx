import React from 'react'
import Link from 'next/link'

export default function IndexPage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome to Maker UI's NextJS example</p>
      <Link href="page-2">
        <a>Go to Page 2</a>
      </Link>
    </>
  )
}
