import * as React from 'react'
import {
  ArrowIcon,
  CloseIcon,
  TrashIcon,
  ReorderIcon,
} from './components/Icons'
import type { FormState } from '@/types'

/**
 * The initial state of the form. This is used to reset the form.
 */
export const initialState: Partial<FormState> = {
  settings: {
    placeholderColor: '#b7b7b7',
    labelPosition: 'top-left',
    errorPosition: 'bottom-right',
    validateFieldOnBlur: true,
    pageTransition: 'fade',
    successTransition: 'fade',
    icons: {
      selectArrow: <ArrowIcon />,
      selectClose: <CloseIcon />,
      remove: <TrashIcon />,
      reorder: <ReorderIcon />,
      add: <>Add</>,
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
  touched: [],
  fields: [],
  schema: {},
  submitCount: 1,
  resetCount: 0,
  isSubmitting: false,
  isValidating: false,
}
