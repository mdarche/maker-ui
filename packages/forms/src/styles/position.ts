import { MakerProps } from 'maker-ui'

const labelStyles: MakerProps['css'] = {
  '.label-top-left': {
    flexDirection: 'column',
  },
  '.label-top-right': {
    flexDirection: 'column',
    '.form-label': {
      textAlign: 'right',
    },
  },
  '.label-top-center': {
    flexDirection: 'column',
    '.form-label': {
      textAlign: 'center',
    },
  },
  '.label-bottom-left': {
    flexDirection: 'column',
  },
  '.label-bottom-center': {
    flexDirection: 'column',
    '.form-label': {
      textAlign: 'center',
    },
  },
  '.label-bottom-right': {
    flexDirection: 'column',
    '.form-label': {
      textAlign: 'right',
    },
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

// TODO - Cover all label / error combinations where there might be a position conflict

const errorStyles: MakerProps['css'] = {
  '.form-error': {
    position: 'absolute',
  },
  '.error-top-right .form-error': { top: 0, right: 0 },
  '.error-top-right.label-top-right .form-error': {
    top: 'initial',
    bottom: '100%',
  },
  '.error-top-left .form-error': { top: 0, left: 0 },
  '.error-top-left.label-top-left .form-error': {
    top: 'initial',
    bottom: '100%',
  },
  '.error-top-center .form-error': {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  '.error-top-center.label-top-center .form-error': { bottom: '100%' },
  '.error-bottom-right .form-error': { top: '100%', right: 0 },
  '.error-bottom-left .form-error': { top: '100%', left: 0 },
  '.error-bottom-center .form-error': {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}

const validationStyles: MakerProps['css'] = {
  '.validate-icon': {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all ease 0.2',
    '&.valid': {
      opacity: 1,
      visibility: 'visible',
    },
  },
}

export const styles: object = {
  ...errorStyles,
  ...labelStyles,
  ...validationStyles,
}
