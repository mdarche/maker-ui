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
    fontSize: ['0.85em', '1em'],
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
  '.theme-box': {
    border: '1px solid',
    height: 'fit-content',
    borderColor: 'var(--color-border)',
    background: 'var(--color-bg_sideNav)',
    padding: '20px',
    h4: {
      margin: 0,
    },
  },
  table: {
    margin: '40px 0',
    fontSize: ['0.95em', '1em'],
  },
  thead: {
    background: 'var(--color-table_th_bg)',
    color: 'var(--color-background)',
    padding: 20,
  },
  th: {
    padding: '6px 15px',
    '&:first-of-type': {
      minWidth: [120, 140],
    },
  },
  td: {
    padding: '12px 20px',
  },
  'tbody tr:nth-of-type(even)': {
    background: 'var(--color-bg_code)',
    code: {
      background: 'var(--color-background)',
    },
  },
  'tr td:first-of-type': {
    fontWeight: 700,
  },
  '#components-list h3': {
    borderTop: '1px solid',
    borderColor: 'var(--color-border_dark)',
    paddingTop: 20,
    '&:first-of-type': {
      border: 'none',
    },
  },
  '.default-value': {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 10px',
    fontSize: '0.9em',
    flexWrap: 'wrap',
    span: {
      display: 'block',
      marginRight: 15,
      fontStyle: 'italic',
      color: 'var(--color-primary)',
    },
  },
  '.prop-type': {
    margin: '0 0 10px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid var(--color-border_dark)',
    paddingBottom: 5,
  },
  '.type-title': {
    marginRight: 15,
    fontSize: '0.85em',
    color: 'var(--color-table_th_bg)',
    fontWeight: 700,
  },
  '.type-value': {
    fontFamily: 'var(--font-monospace)',
    color: 'var(--color-primary)',
    paddingTop: 1,
  },
}
