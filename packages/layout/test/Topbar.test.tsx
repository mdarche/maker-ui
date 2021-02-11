import * as React from 'react'
import { render, screen } from '@testing-library/react'

// import { defaultOptions } from '../src/options'
import { Wrapper } from './setup'
import { Topbar } from '../src'

test('renders the Topbar with default props', () => {
  render(
    <Wrapper content footer>
      <Topbar data-testid="topbar">topbar</Topbar>
    </Wrapper>
  )

  expect(screen.queryByTestId('topbar')).toBeInTheDocument()
  expect(screen.queryByTestId('topbar')).toHaveStyle({
    top: 0,
    background: 'var(--color-bg_topbar)',
  })
  // Target container, not the topbar directly
  expect(screen.getByText('topbar')).toHaveStyle({
    maxWidth: 'var(--maxWidth_topbar)',
  })
})
