import * as React from 'react'

interface ConditionalWrapperProps {
  condition: boolean
  wrapper: (
    children: React.ReactNode | React.ReactElement
  ) => React.ReactElement
  children: React.ReactElement
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps): React.ReactElement =>
  condition ? wrapper(children) : children
