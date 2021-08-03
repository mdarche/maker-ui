import * as React from 'react'
import { Grid } from 'maker-ui'
import { Form as FormikForm } from 'formik'

import { TextField } from './Field'
import { FieldProps } from './types'

interface FormProps {
  children: React.ReactNode
  fields?: FieldProps[]
  className?: string
  id?: string
  settings?: {
    columns?: any // TODO fix this
    gap?: number
    pages?: number
    pageTransition?: boolean
    labelStyle?: string
    placeholderColor?: string
    progressBar?:
      | boolean
      | ((
          currentStep: number,
          setStep: () => void,
          totalSteps: number
        ) => React.ReactNode)
  }
}

/**
 * The `Form` component lets you generate a highly customized form from a
 * configuration object and field array. Based on Formik.
 * .
 *
 * @link https://maker-ui.com/docs/form
 */

export const Form = ({
  id,
  className,
  fields,
  settings,
  children,
}: FormProps) => {
  // Register fields with Form component context
  // Get settings and add CSS to grid - (grid columns, placeholder text, label type, pages, page transition, stepper (style), stepper callback component)
  // Current page and total pages

  return (
    <FormikForm id={id} className={className}>
      {fields ? (
        <Grid
          columns={settings?.columns || '1fr'}
          css={{
            columnGap: settings?.gap || 30,
            'input::placeholder, input:-ms-input-placeholder, ::-ms-input-placeholder': {
              opacity: 1,
              color: settings?.placeholderColor || '#b7b7b7',
            },
          }}>
          {renderFields(fields)}
        </Grid>
      ) : null}
      {children}
    </FormikForm>
  )
}

export function renderFields(fields: FieldProps[]) {
  const textInputs = [
    'text',
    'email',
    'tel',
    'email',
    'password',
    'url',
    'select',
    'select-datalist',
    'date',
    'file',
    'color',
    'textarea',
  ]

  return fields.map((props: FieldProps) => {
    if (textInputs.includes(props.type)) {
      return <TextField key={props.id} {...props} />
    }
  })
}
