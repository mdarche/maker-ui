'use client'

import React, { useRef } from 'react'
import { mergeRefs, Conditional } from '@maker-ui/utils'
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
  /** ID is a required unique string (necessary for client hydration and local scoping) */
  id?: string
  switchMode?: 'out-in' | 'in-out'
  isSwitch?: boolean
  show: boolean | string | number
  type?: TransitionType
  classNamePrefix?: string
  className?: string
  nodeRef?: React.MutableRefObject<any>
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  unmountOnExit?: boolean
  timeout?: number
  distance?: number | string
  easing?: string
  noStyles?: boolean
  children: React.ReactNode
}

export const CSSTransition = ({
  id,
  type = 'fade-up',
  isSwitch = false,
  switchMode = 'out-in',
  timeout = 300,
  distance = 10,
  unmountOnExit = true,
  easing = 'ease',
  className,
  show,
  nodeRef,
  containerProps,
  noStyles = false,
  children,
  ...props
}: CSSTransitionProps) => {
  const ref = useRef(null)
  const styles = getStyles(type, distance, timeout, easing, id)
  const isShowBool = typeof show === 'boolean'
  const isSwitchTransition = isSwitch || !isShowBool
  const t = id ? `${id}-${type}` : type
  const switchKey =
    isSwitchTransition && isShowBool
      ? show
        ? 'key-1'
        : 'key-0'
      : (show as string | number)

  return (
    <>
      {className || noStyles ? undefined : (
        <style id={`mkui_style_${id}`}>{styles}</style>
      )}
      <Conditional
        wrapper={(c) => (
          <SwitchTransition mode={switchMode}>
            {c as React.ReactElement}
          </SwitchTransition>
        )}
        condition={isSwitchTransition}>
        <ReactCSSTransition
          key={isSwitchTransition ? switchKey : undefined}
          in={!isSwitchTransition ? show : undefined}
          nodeRef={nodeRef ? mergeRefs([ref, nodeRef]) : ref}
          timeout={timeout}
          classNames={className || t}
          unmountOnExit={unmountOnExit}
          {...props}>
          <div ref={ref} {...containerProps}>
            {children}
          </div>
        </ReactCSSTransition>
      </Conditional>
    </>
  )
}
