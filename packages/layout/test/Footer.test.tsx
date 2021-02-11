import * as React from 'react'
import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'

import { Wrapper } from './setup'
import { Footer } from '../src'

test('renders the Footer with default props', () => {
  render(
    <Wrapper header content>
      <Footer>footer</Footer>
    </Wrapper>
  )

  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toHaveStyle({
    background: 'var(--color-bg_footer)',
  })
  // Target container, not the footer directly
  expect(screen.getByText('footer')).toHaveStyle({
    maxWidth: 'var(--maxWidth_footer)',
  })
})

test('_css is applied to root and css is applied to container', () => {
  render(
    <Wrapper header content>
      <Footer _css={{ margin: 10 }} css={{ padding: 20 }}>
        footer
      </Footer>
    </Wrapper>
  )

  expect(screen.getByRole('contentinfo')).toHaveStyle({
    margin: '10px',
  })
  expect(screen.getByText('footer')).toHaveStyle({
    padding: '20px',
  })
})
