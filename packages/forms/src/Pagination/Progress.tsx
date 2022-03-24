import * as React from 'react'
import { mergeSelectors } from '@maker-ui/utils'
import { useForm } from '../FormProvider'

export interface FormProgressProps {
  id?: string
  className?: string
  style?: 'bar' | 'circle'
  stepper?:
    | React.ReactNode
    | ((
        currentStep: number,
        setStep: (n: number) => void,
        totalSteps: number
      ) => React.ReactNode)
  transition?: string
  clickable?: boolean
}
// TODO Add more pre-built styles

export const Progress = ({
  id,
  className,
  style = 'bar',
  stepper,
  ...props
}: FormProgressProps) => {
  const { currentPage, settings } = useForm()
  const pageCount = settings.pages || 1

  return style === 'bar' ? (
    <progress
      id={id}
      className={mergeSelectors(['form-progress', className])}
      value={currentPage / pageCount}
      max="100"
      {...props}
    />
  ) : null
}

Progress.displayName = 'FormProgress'
