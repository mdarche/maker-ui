/**
 * Shared page content styles
 */

export const content_styles = {
  // MDX Headings
  '.markdown>h2:before, .markdown>h3:before, .markdown>h4:before': {
    display: 'block',
    height: '5rem',
    marginTop: '-5rem',
    visibility: 'hidden',
    content: '""',
  },
  // Heading Links
  '.anchor-link': {
    display: 'inline-block',
    marginLeft: 8,
    textDecoration: 'underline',
    opacity: 0,
    '&:focus': {
      opacity: 1,
    },
  },
  'h2:hover, h3:hover, h4:hover': {
    '.anchor-link': {
      opacity: 1,
    },
  },
}
