import * as React from 'react'
import { ValidateIcon } from '../components/Icons'
import type { FormState } from '@/types'

/**
 * The initial state of the form. This is used to reset the form.
 */
export const initialState: FormState = {
  settings: {
    validateIcon: <ValidateIcon />,
    columns: 'repeat(2, 1fr)',
    gap: 15,
    placeholderColor: '#b7b7b7',
    labelPosition: 'top-left',
    errorPosition: 'bottom-right',
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
