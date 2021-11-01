import type { MakerMenu } from 'maker-ui'

/**
 * Recursively flatten an array of MenuItems
 */

export function flatten(arr: MakerMenu) {
  return arr.reduce((flattened, { path, label, submenu }) => {
    return flattened
      .concat([{ path, label }])
      .concat(submenu ? flatten(submenu) : [])
  }, [])
}

/**
 * Night Owl Code theme
 */
export const codeTheme: any = {
  plain: {
    color: '#fff',
    backgroundColor: '#061234',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'rgb(173, 219, 103)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#7a8d8d',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: '#f8c06d',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(214, 222, 235)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(247, 140, 108)',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'keyword'],
      style: {
        color: 'rgb(199, 146, 234)',
      },
    },
    {
      types: ['function', 'function-variable'],
      style: {
        color: '#74a6ff',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgb(127, 219, 202)',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'rgb(199, 146, 234)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#fe6a5c',
      },
    },
    {
      types: ['tag', 'operator'],
      style: {
        color: '#c1f1e8',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(255, 88, 116)',
      },
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(128, 203, 196)',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)',
      },
    },
  ],
}
