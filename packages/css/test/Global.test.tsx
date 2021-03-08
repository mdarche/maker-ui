import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Global } from '../src/Global'

const color = 'rgb(251, 251, 251)'
const breakpoints = [450, 768]

describe('Global style component', () => {
  test('global styles are added to the DOM', () => {
    render(<Global styles={{ body: { background: color } }} />)

    const body = document.querySelector('body')
    const style = body ? window.getComputedStyle(body).background : undefined
    expect(style).toEqual(color)
  })

  test('global parses nested objects and responsive properties', () => {
    render(
      <>
        <Global
          breakpoints={breakpoints}
          styles={{
            h2: { fontSize: [24, 28] },
            a: { textDecoration: 'none' },
          }}
        />
        <h2 id="heading">Heading</h2>
        <a href="/">Link</a>
      </>
    )

    expect(screen.getByText('Link')).toHaveStyle({ textDecoration: 'none' })
    expect(screen.getByText('Heading')).toHaveStyle({ fontSize: '24px' })

    // Test for media queries in snapshot
    expect(document.head).toMatchSnapshot()
  })
})
