import * as React from 'react'
import { ValidateIcon, ArrowIcon, CloseIcon } from './components/Icons'
import type { FormState } from '@/types'

/**
 * The initial state of the form. This is used to reset the form.
 */
export const initialState: Partial<FormState> = {
  settings: {
    columns: 'repeat(2, 1fr)',
    gap: 25,
    placeholderColor: '#b7b7b7',
    labelPosition: 'top-left',
    errorPosition: 'bottom-right',
    validateFieldOnBlur: true,
    autoSave: false,
    pageTransition: 'fade',
    successTransition: 'fade',
    icons: {
      selectArrow: <ArrowIcon />,
      selectClose: <CloseIcon />,
      validate: <ValidateIcon />,
      nextArrow: (
        <ArrowIcon
          className="icon-next"
          style={{ transform: 'rotate(-90deg)' }}
        />
      ),
      prevArrow: (
        <ArrowIcon
          className="icon-prev"
          style={{ transform: 'rotate(90deg)' }}
        />
      ),
    },
  },
  currentPage: 1,
  totalPages: 1,
  errors: {},
  values: {},
  conditions: {},
  touched: [],
  fields: [],
  schema: {},
  submitCount: 1,
  resetCount: 0,
  isSubmitting: false,
  isValidating: false,
}
