import * as React from 'react'

interface ConditionalProps {
  /** If this condition is true, this component will wrap all children with the `wrapper` prop. */
  condition: boolean
  /** A render prop JSX container that will wrap all children if `condition` is true */
  wrapper: (children: React.ReactNode) => React.ReactElement
  /** Main content that will always display, regardless of condition truthiness*/
  children: React.ReactElement
}

/**
 * Conditional uses a render prop to wrap children with a wrapper component if a condition is true.
 */
export const Conditional = ({
  condition,
  wrapper,
  children,
}: ConditionalProps): React.ReactElement =>
  condition ? wrapper(children) : children
