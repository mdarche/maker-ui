/**
 * Internal Maker UI variants for header layouts
 *
 * @internal only
 *
 */

const base = {
  position: 'relative',
  m: '0 auto',
  alignItems: 'center',
  flexWrap: 'wrap',
}

export const headerStyles = {
  base,
  default: {
    ...base,
    justifyContent: 'space-between',
  },
  center: {
    ...base,
    justifyContent: ['space-between', 'center'],
  },
  columns: {
    ...base,
    '.col-1': {
      alignItems: 'center',
      width: ['25%', '33%'],
      button: {
        m: 0,
      },
    },
    '.col-2': {
      width: ['50%', '34%'],
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.col-3': {
      width: ['25%', '33%'],
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  },
}
