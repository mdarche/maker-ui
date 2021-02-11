import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Wrapper } from './setup'
import { Header, MakerUIOptions } from '../src'

/**
 * JSDOM tests for detecting presence in document and changes to props
 * or root MakerUIOptions
 *
 * Use Cypress for layout tests:
 * - stickyOnMobile
 * - stickyScroll
 */

const newOptions: MakerUIOptions = {
  colors: {
    light: {
      bg_header: 'rgb(0, 0, 0)',
    },
  },
  header: {
    sticky: true,
    absolute: true,
  },
}

test('renders the Header', () => {
  render(
    <Wrapper content footer>
      <Header>header</Header>
    </Wrapper>
  )

  expect(screen.getByRole('banner')).toBeInTheDocument()
})

test('renders with default options as well as custom options', () => {
  const { rerender } = render(
    <Wrapper content footer>
      <Header>Header</Header>
    </Wrapper>
  )

  // const el = document.querySelector('header')

  // expect(screen.getByRole('banner')).toHaveStyle({
  //   position: 'relative',
  //   // zIndex: 100,
  //   // background: 'var(--color-bg_header)',
  // })

  rerender(
    <Wrapper options={newOptions} content footer>
      <Header>header</Header>
    </Wrapper>
  )
  // expect(el).toHaveStyle(`
  //   position: fixed;
  // `)
})

test('overwrites options with jsx props', () => {})

test('uses Topbar height to calculate its top position', () => {})
