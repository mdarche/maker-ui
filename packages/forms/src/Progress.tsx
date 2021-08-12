import * as React from 'react'

export interface ProgressProps {
  style?: 'bar' | 'circle'
  stepper?:
    | React.ReactNode
    | ((
        currentStep: number,
        setStep: () => void,
        totalSteps: number
      ) => React.ReactNode)
  transition?: string
  clickable?: boolean
}
// TODO
export const Progress = ({ style = 'bar', stepper }: ProgressProps) => {
  console.log(style, stepper)
  return <div>FormPage</div>
}

Progress.displayName = 'FormProgress'
