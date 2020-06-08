/**
 * Internal Maker UI variants for header layouts
 *
 * @internal only
 *
 */

export default {
  mui_header: {
    base: {
      position: 'relative',
      m: '0 auto',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    default: {
      variant: 'mui_header.base',
      justifyContent: 'space-between',
    },
    center: {
      variant: 'mui_header.base',
      justifyContent: ['space-between', 'center'],
    },
    columns: {
      variant: 'mui_header.base',
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
  },
}
