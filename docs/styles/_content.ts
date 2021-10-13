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
  '.markdown a': {
    fontWeight: 700,
  },
  '.callout': {
    padding: '25px 20px',
    borderLeft: '5px solid',
    margin: '30px 0',
    borderRadius: 3,
    span: {
      fontWeight: 700,
    },
    '&.info': {
      borderColor: 'var(--color-callout_info_accent)',
      background: 'var(--color-callout_info)',
      code: {
        background: 'var(--color-callout_info_code)',
        color: 'var(--color-callout_info_accent)',
      },
      a: {
        color: 'var(--color-callout_info_accent)',
      },
    },
    '&.suggestion': {
      background: 'var(--color-callout_suggestion)',
      borderColor: 'var(--color-callout_suggestion_accent)',
      code: {
        background: 'var(--color-callout_suggestion_code)',
        color: 'var(--color-callout_suggestion_accent)',
      },
      a: {
        color: 'var(--color-callout_suggestion_accent)',
      },
    },
    '&.alert': {
      background: 'var(--color-callout_alert)',
      borderColor: 'var(--color-callout_alert_accent)',
      code: {
        background: 'var(--color-callout_alert_code)',
        color: 'var(--color-callout_alert_accent)',
      },
      a: {
        color: 'var(--color-callout_alert_accent)',
      },
    },
  },
}
