import React, { useRef } from 'react'
import type { DivProps } from '@maker-ui/primitives'
import { mergeRefs, ConditionalWrapper } from '@maker-ui/utils'
import { Global } from '@maker-ui/css'
import {
  CSSTransition as ReactCSSTransition,
  SwitchTransition,
  type CSSTransition as ReactCSSTransitionProps,
} from 'react-transition-group'
import { getStyles } from './styles'

export type TransitionType =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'

export interface CSSTransitionProps
  extends Partial<ReactCSSTransitionProps<HTMLDivElement>> {
  switchMode?: 'out-in' | 'in-out'
  show?: boolean
  key?: string | number
  type?: TransitionType
  classNamePrefix?: string
  className?: string
  nodeRef?: React.MutableRefObject<any>
  containerProps?: DivProps
  unmountOnExit?: boolean
  timeout?: number
  distance?: number | string
  easing?: string
  children: React.ReactNode
}

export const CSSTransition = ({
  type = 'fade-up',
  switchMode = 'out-in',
  timeout = 300,
  distance = 10,
  unmountOnExit = true,
  easing = 'ease',
  className,
  classNamePrefix,
  show,
  key,
  nodeRef,
  containerProps,
  children,
  ...props
}: CSSTransitionProps) => {
  const ref = useRef(null)

  return (
    <>
      {className ? undefined : (
        <Global
          styles={getStyles(type, distance, timeout, easing, classNamePrefix)}
        />
      )}
      <ConditionalWrapper
        wrapper={(c) => (
          <SwitchTransition mode={switchMode}>
            {c as React.ReactElement}
          </SwitchTransition>
        )}
        condition={key ? true : false}>
        <ReactCSSTransition
          key={key}
          in={!key ? show : undefined}
          nodeRef={nodeRef ? mergeRefs([ref, nodeRef]) : ref}
          timeout={timeout}
          className={className || type}
          unmountOnExit={unmountOnExit}
          {...props}>
          <div ref={ref} {...containerProps}>
            {children}
          </div>
        </ReactCSSTransition>
      </ConditionalWrapper>
    </>
  )
}
