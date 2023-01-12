import * as React from 'react'
import { ValidateIcon } from '../Icons'
import type { FormState } from './types'

export const initialState: FormState = {
  settings: {
    validateIcon: <ValidateIcon />,
    columns: '1fr',
    gap: 30,
    placeholderColor: '#b7b7b7',
    labelStyle: 'top-left',
    errorStyle: 'bottom-right',
    validateFormOnBlur: false,
    validateFieldOnBlur: true,
    autoSave: false,
  },
  currentPage: 1,
  errors: {},
  values: {},
  touched: [],
  submitCount: 0,
  isSubmitting: false,
  isValidating: false,
}
