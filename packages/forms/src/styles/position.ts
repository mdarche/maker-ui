import { MakerProps } from 'maker-ui'

const labelStyle: MakerProps['css'] = {
  '.label-top': {
    flexDirection: 'column',
  },
  '.label-bottom': {
    flexDirection: 'column',
  },
  '.label-left': {
    flex: 'auto',
  },
  '.label-right': {
    input: {
      flex: 'auto',
    },
  },
  '.label-floating': {},
  '.form-label': {},
}

const errorStyle: MakerProps['css'] = {
  '.error-top-right': {},
  '.error-top-left': {},
  '.error-bottom-right': {},
  '.error-bottom-left': {},
  '.error-bottom-center': {},
  '.form-error': {
    position: 'absolute',
  },
}

const style: MakerProps['css'] = { ...errorStyle, ...labelStyle }

export default style
