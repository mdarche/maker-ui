'use client'

import React, { useRef } from 'react'
import {
  Transition as ReactTransition,
  type TransitionStatus,
  type Transition as ReactTransitionProps,
} from 'react-transition-group'
import { StyleObject } from '@maker-ui/css'
import { mergeRefs } from '@maker-ui/utils'

export type TransitionState = {
  [key in TransitionStatus | 'start']?: {
    [key: string]: number | string | undefined
  }
}

export interface TransitionProps
  extends Partial<ReactTransitionProps<HTMLDivElement>> {
  nodeRef?: React.MutableRefObject<any>
  show: boolean
  containerProps?: React.HTMLAttributes<HTMLDivElement>
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
  timeout?: number
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
  nodeRef,
  easing = 'ease-in-out',
  timeout = 300,
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
      timeout={timeout}
      unmountOnExit={unmountOnExit}
      {...props}>
      {(state) => (
        <div
          ref={nodeRef ? mergeRefs([ref, nodeRef]) : ref}
          {...containerProps}
          style={{
            ...transitionState?.start,
            transition: `all ${timeout}ms ${easing}`,
            ...transitionState[state],
            ...(containerProps?.style ? containerProps.style : {}),
          }}>
          {children}
        </div>
      )}
    </ReactTransition>
  )
}
