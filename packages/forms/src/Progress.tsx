import * as React from 'react'

export interface ProgressProps {
  style?: 'none' | 'bar' | 'circle' | React.ReactNode
  steps?: React.ReactNode | { label: string | React.ReactNode }[] // todo make this a callback with current step and total steps as props
  transition?: string
  clickable?: boolean
}
// Title prop that accepts a react component and is page aware
export const Progress = ({ style, steps }: ProgressProps) => {
  console.log(style, steps)
  return <div>FormPage</div>
}
