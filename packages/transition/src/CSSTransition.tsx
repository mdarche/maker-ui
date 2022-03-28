import React, { useRef } from 'react'
import { Div, DivProps } from '@maker-ui/primitives'
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
  show: boolean | string | number
  type?: TransitionType
  classNamePrefix?: string
  className?: string
  nodeRef?: React.MutableRefObject<any>
  containerProps?: DivProps
  unmountOnExit?: boolean
  timeout?: number
  distance?: number | string
  easing?: string
  noStyles?: boolean
  css?: DivProps['css']
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
  nodeRef,
  containerProps,
  noStyles = false,
  css,
  children,
  ...props
}: CSSTransitionProps) => {
  const ref = useRef(null)
  const styles = getStyles(type, distance, timeout, easing, classNamePrefix)
  const isSwitchTransition = typeof show !== 'boolean'
  const t = classNamePrefix ? `${classNamePrefix}-${type}` : type
  return (
    <>
      {className || noStyles ? undefined : <Global styles={styles} />}
      <ConditionalWrapper
        wrapper={(c) => (
          <SwitchTransition mode={switchMode}>
            {c as React.ReactElement}
          </SwitchTransition>
        )}
        condition={isSwitchTransition}>
        <ReactCSSTransition
          key={isSwitchTransition ? show : undefined}
          in={!isSwitchTransition ? show : undefined}
          nodeRef={nodeRef ? mergeRefs([ref, nodeRef]) : ref}
          timeout={timeout}
          classNames={className || t}
          unmountOnExit={unmountOnExit}
          {...props}>
          <Div ref={ref} {...containerProps} css={css}>
            {children}
          </Div>
        </ReactCSSTransition>
      </ConditionalWrapper>
    </>
  )
}