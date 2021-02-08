import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Global } from '../src/Global'

const color = 'rgb(251, 251, 251)'
const breakpoints = [450, 768]

// const resizeWindow = (x: number) => {
//   // @ts-ignore
//   window.innerWidth = x
//   window.dispatchEvent(new Event('resize'))
// }

test('global styles are rendered to the DOM', () => {
  render(<Global styles={{ body: { background: color } }} />)

  const body = document.querySelector('body')
  const style = body ? window.getComputedStyle(body).background : undefined
  expect(style).toEqual(color)
})

test('global supports ResponsiveScale properties', () => {
  const Component = () => (
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
  render(<Component />)

  expect(screen.getByText('Link')).toHaveStyle({ textDecoration: 'none' })
  expect(screen.getByText('Heading')).toHaveStyle({ fontSize: '24px' })

  // unmount()
  // resizeWindow(770)
  // render(<Component />)

  // expect(screen.getByText('Heading')).toHaveStyle({ fontSize: '28px' })
})
