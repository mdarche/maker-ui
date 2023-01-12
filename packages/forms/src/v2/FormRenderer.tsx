import * as React from 'react'
import type { FormProps } from './Form'

interface FormRendererProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit: FormProps['onSubmit']
  children: React.ReactNode
}

export const FormRenderer = ({
  children,
  onSubmit,
  ...props
}: FormRendererProps) => {
  return (
    <>
      <form {...props}>FormRenderer</form>
    </>
  )
}
