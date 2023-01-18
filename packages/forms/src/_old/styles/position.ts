import { StyleObject } from '@maker-ui/css'

const labelStyles: StyleObject = {
  '.label-top-left': {
    flexDirection: 'column',
  },
  '.label-top-right': {
    flexDirection: 'column',
    '.field-label': {
      textAlign: 'right',
    },
  },
  '.label-top-center': {
    flexDirection: 'column',
    '.field-label': {
      textAlign: 'center',
    },
  },
  '.label-bottom-left': {
    flexDirection: 'column',
  },
  '.label-bottom-center': {
    flexDirection: 'column',
    '.field-label': {
      textAlign: 'center',
    },
  },
  '.label-bottom-right': {
    flexDirection: 'column',
    '.field-label': {
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
  '.field-label': {},
}

// TODO - Cover all label / error combinations where there might be a position conflict

const errorStyles: StyleObject = {
  // Field Errors
  '.field-error': {
    position: 'absolute',
  },
  '.error-top-right .field-error': { top: 0, right: 0 },
  '.error-top-right.label-top-right .field-error': {
    top: 'initial',
    bottom: '100%',
  },
  '.error-top-left .field-error': { top: 0, left: 0 },
  '.error-top-left.label-top-left .field-error': {
    top: 'initial',
    bottom: '100%',
  },
  '.error-top-center .field-error': {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  '.error-top-center.label-top-center .field-error': { bottom: '100%' },
  '.error-bottom-right .field-error': { top: '100%', right: 0 },
  '.error-bottom-left .field-error': { top: '100%', left: 0 },
  '.error-bottom-center .field-error': {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  // Form Error
  '.form-main-error': {},
}

const validationStyles: StyleObject = {
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

const dividerStyles: StyleObject = {
  '.divider': {
    gridColumn: '1 / -1',
  },
}

export const styles: object = {
  ...errorStyles,
  ...labelStyles,
  ...validationStyles,
  ...dividerStyles,
}
