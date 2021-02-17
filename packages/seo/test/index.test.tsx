import * as React from 'react'
import { render, waitFor } from '@testing-library/react'

import { SEO, SEOProvider } from '../src'

const meta = {
  title: 'SEO Test',
  titleTemplate: ' | Maker UI',
  description: 'Testing the Maker UI SEO components',
}

test('SEOProvider uses default values', async () => {
  render(
    <SEOProvider default={meta}>
      <SEO />
      <h1>Hello</h1>
    </SEOProvider>
  )
  await waitFor(() => expect(document.title).toEqual('SEO Test | Maker UI'))
})

// test('SEO component overrides provider defaults', async () => {
//   render(
//     <SEOProvider default={meta}>
//       <SEO title="New Title" description="Test description" noTemplate />
//       <h1>Hello</h1>
//     </SEOProvider>
//   )
//   expect(document.title).toBe('New Title')
//   expect(
//     // @ts-ignore
//     document.querySelector('meta[name="description"]').getAttribute('content')
//   ).toBe('Test description')
// })
