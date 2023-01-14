import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useForm } from '../hooks'
import { FieldProps } from '../types'

const basicInputs = [
  'text',
  'textarea',
  'email',
  'number',
  'tel',
  'password',
  'url',
  'date',
  'file',
  'color',
]

const top = ['top-right', 'top-left', 'top-center', 'left', 'floating']
const bottom = ['bottom-right', 'bottom-left', 'bottom-center', 'right']

export const Field = (props: FieldProps) => {
  const { settings } = useForm()
  // Helpers
  const labelPos = props?.labelPosition || settings?.labelPosition
  const errorPos = props?.errorPosition || settings?.errorPosition

  return (
    <div
      className={cn([
        'mkui_field_container',
        props.className,
        settings?.classNames?.fieldContainer,
      ])}></div>
  )
}
