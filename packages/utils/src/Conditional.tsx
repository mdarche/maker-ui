import * as React from 'react'

interface ConditionalProps {
  /** If this condition is true, this component will wrap all children with the `wrapper` prop. */
  condition: boolean
  /** A render prop JSX container that will wrap all children if `condition` is true */
  trueWrapper?: (children: React.ReactNode) => React.ReactElement
  /** A render prop JSX container that will wrap all children if `condition` is false */
  falseWrapper?: (children: React.ReactNode) => React.ReactElement
  /** Main content that will always display, regardless of condition truthiness*/
  children: React.ReactElement
}

/**
 * Conditionally wraps children with a custom component.
 *
 * @example
 * <Conditional
 *    condition={true}
 *    trueWrapper={(children) => (
 *      <div>
 *        <span>This is only visible if the condition is true</span>
 *        {children}
 *      </div>
 *    )}
 *    falseWrapper={(children) => (
 *     <div>
 *        <span>This is only visible if the condition is false</span>
 *        {children}
 *     </div>
 *    )}>
 *    <div>This will always be visible</div>
 * </Conditional>
 */
export const Conditional = ({
  condition,
  trueWrapper,
  falseWrapper,
  children,
}: ConditionalProps): React.ReactElement => {
  if (condition && trueWrapper) {
    return trueWrapper(children)
  } else if (!condition && falseWrapper) {
    return falseWrapper(children)
  } else {
    return children
  }
}
