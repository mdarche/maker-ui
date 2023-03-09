import React, { useRef } from 'react'
import {
  Transition as ReactTransition,
  type TransitionStatus,
  type Transition as ReactTransitionProps,
} from 'react-transition-group'
import { merge, mergeRefs } from '@maker-ui/utils'

export type TransitionState = {
  [key in TransitionStatus | 'start']?: {
    [key: string]: number | string | undefined
  }
}

export interface TransitionProps
  extends Partial<ReactTransitionProps<HTMLDivElement>> {
  /** An optional nodeRef for React Transition Group's Transition component that will be merged
   * with the component default node ref.
   */
  nodeRef?: React.RefObject<HTMLElement>
  /** Determines whether the Transition's children should show or hide */
  show: boolean
  /** Props to pass to the container div that directly wraps any child elements. */
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  /** If true, the component will unmount when the transition is complete */
  unmountOnExit?: boolean
  /** CSS easing function
   * @default 'ease-in-out'
   */
  easing?: string
  /** Lets you customize the different states of the mount / unmount transition
   * @default
   * const transitions: {
   *   start: { opacity: 0 },
   *   entering: { opacity: 1 },
   *   entered: { opacity: 1 },
   *   exiting: { opacity: 0 },
   *   exited: { opacity: 0 },
   * }
   */
  transitionState?: TransitionState
  /** Animation duration in milliseconds
   * @default 300
   */
  timeout?: number
  /** The child elements to be transitioned */
  children: React.ReactNode
}

const defaultTransitions: TransitionState = {
  start: { opacity: 0 },
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

/**
 * The Transition component is a wrapper for the React Transition Group's Transition component
 * that makes the transition styles more flexible and easier to use.
 *
 * @see https://reactcommunity.org/react-transition-group/transition
 */
export const Transition = ({
  show = false,
  nodeRef,
  easing = 'ease-in-out',
  timeout = 300,
  unmountOnExit = true,
  transitionState = defaultTransitions,
  containerProps,
  children,
  ...props
}: TransitionProps) => {
  const ref = useRef(null)
  return (
    <ReactTransition
      nodeRef={ref}
      in={show}
      timeout={timeout}
      unmountOnExit={unmountOnExit}
      {...props}>
      {(state) => (
        <div
          ref={nodeRef ? mergeRefs([ref, nodeRef]) : ref}
          {...containerProps}
          style={merge(containerProps?.style || {}, {
            ...transitionState?.start,
            transition: `all ${timeout}ms ${easing}`,
            ...transitionState[state],
          })}>
          {children}
        </div>
      )}
    </ReactTransition>
  )
}
