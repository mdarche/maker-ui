import { GlobalProps } from '@emotion/react'

export const globalStyles: GlobalProps['styles'] = {
  '*': {
    boxSizing: 'border-box',
  },
  body: {
    margin: 0,
    fontFamily: 'var(--fonts-body)',
    color: 'var(--colors-text)',
    backgroundColor: 'var(--colors-background)',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: 'var(--fonts-heading)',
  },
  'code, pre': {
    fontFamily: 'var(--fonts-monospace)',
  },
  'b, strong': {
    fontWeight: 'bold',
  },
  a: {
    color: 'var(--colors-link)',
    '&:hover': {
      color: 'var(--colors-link_hover)',
    },
  },
}

// Optional normalize
// Optional scaling & responsive width
