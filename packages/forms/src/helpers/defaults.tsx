import * as React from 'react'
import { ValidateIcon } from '../components/Icons'
import type { FormState } from '@/types'

export const initialState: FormState = {
  settings: {
    validateIcon: <ValidateIcon />,
    columns: '1fr',
    gap: 30,
    placeholderColor: '#b7b7b7',
    labelPosition: 'top-left',
    errorPosition: 'bottom-right',
    validateFormOnBlur: false,
    validateFieldOnBlur: true,
    autoSave: false,
  },
  currentPage: 1,
  totalPages: 1,
  errors: {},
  values: {},
  touched: [],
  fields: [],
  schema: {},
  submitCount: 1,
  isSubmitting: false,
  isValidating: false,
}
