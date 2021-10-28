/**
 * Global code and syntax highlighting styles
 */

export const code_styles = {
  code: {
    display: 'inline-block',
    borderRadius: 2,
    fontSize: ['1.125em'],
    backgroundColor: 'var(--color-bg_code)',
    color: 'var(--color-primary)',
    padding: '0 8px',
    fontWeight: 700,
  },
  '.highlight': {
    position: 'relative',
    fontSize: [12, 15],
    '&.shell pre': {
      padding: ['55px 30px 25px', '65px 30px 30px'],
    },
  },
  pre: {
    padding: ['55px 10px 25px', '65px 0 30px'],
    borderRadius: 5,
    lineHeight: [1.5, 1.5],
    overflowX: 'scroll',
    boxShadow: 'var(--color-shadow_pre)',
  },
  '.code-header': {
    padding: '8px 10px',
    position: 'absolute',
    width: '100%',
    top: 0,
    fontSize: [13, 15],
    color: '#fff',
    borderBottom: '1px solid',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  '.code-wrapper': {
    margin: '40px auto',
    maxWidth: 'calc(100vw - 40px)',
    position: 'relative',
  },
  '.token': {
    display: 'inline-block',
  },
  '.line-number-style': {
    position: 'relative',
    display: 'inline-block',
    width: [25, 50],
    userSelect: 'none',
    opacity: 0.3,
    textAlign: ['left', 'center'],
  },
  '.highlight-line': {
    backgroundColor: '#1b2741',
    borderLeft: '4px solid #c792ea',
  },
  '.highlight-line .line-number-style': {
    opacity: 0.5,
    left: -4,
  },
  '.copy-button': {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: [14, 15],
    fontWeight: 400,
    svg: {
      height: [17],
      fill: 'rgb(255, 255, 255, 0.4)',
      marginRight: 10,
      transition: 'all ease .3s',
    },
    color: 'rgb(255, 255, 255, 0.35)',
    transition: 'all ease .3s',
    '&:hover': {
      color: '#fff',
      svg: { fill: '#fff' },
    },
  },
}
