import React, { useRef } from 'react'
import {
  Transition as ReactTransition,
  type TransitionStatus,
  type Transition as ReactTransitionProps,
} from 'react-transition-group'
import { StyleObject } from '@maker-ui/css'
import { Div, type DivProps } from '@maker-ui/primitives'

export type TransitionState = {
  [key in TransitionStatus | 'start']?: {
    [key: string]: number | string | undefined
  }
}

export interface TransitionProps extends ReactTransitionProps<HTMLDivElement> {
  show?: boolean
  containerProps?: DivProps
  css?: StyleObject
  unmountOnExit?: boolean
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
  duration?: number
  children: React.ReactNode
}

const defaultTransitions: TransitionState = {
  start: { opacity: 0 },
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

export const Transition = ({
  show = false,
  easing = 'ease-in-out',
  duration = 300,
  unmountOnExit = true,
  transitionState = defaultTransitions,
  css,
  containerProps,
  children,
  ...props
}: TransitionProps) => {
  const ref = useRef(null)
  return (
    <ReactTransition
      nodeRef={ref}
      in={show}
      timeout={duration}
      unmountOnExit={unmountOnExit}
      {...props}>
      {(state) => (
        <Div
          ref={ref}
          {...containerProps}
          css={css}
          style={{
            ...transitionState?.start,
            transition: `all ${duration}ms ${easing}`,
            ...transitionState[state],
          }}>
          {children}
        </Div>
      )}
    </ReactTransition>
  )
}
