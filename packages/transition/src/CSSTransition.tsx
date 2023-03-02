'use client'

import React, { useRef } from 'react'
import { mergeRefs, Conditional, generateId } from '@maker-ui/utils'
import {
  CSSTransition as ReactCSSTransition,
  SwitchTransition,
  type CSSTransition as ReactCSSTransitionProps,
} from 'react-transition-group'
import { Style } from '@maker-ui/style'
import { getStyles } from './styles'

export type TransitionType =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'

export interface CSSTransitionProps
  extends Partial<ReactCSSTransitionProps<HTMLDivElement>> {
  /** A custom, unique ID for the transition styles */
  id?: string
  /** Switch mode for the CSSTransition
   * @link https://reactcommunity.org/react-transition-group/switch-transition
   * @default 'out-in'
   */
  switchMode?: 'out-in' | 'in-out'
  /** If true, you do not have to supply explicit strings for the `show` prop
   * @default false
   */
  isSwitch?: boolean
  /** A boolean, number, or string that triggers the transition. This value can be a boolean
   * if you are only transitioning one element, or a string or number if you are transitioning
   * several different elements. You may also use a boolean with `isSwitch` set to true if
   * you are switching between 2 elements.
   */
  show: boolean | string | number
  /** The transition type (fade, fade-up, fade-down, fade-left, fade-right)
   * @default 'fade-up'
   */
  type?: TransitionType
  /** If you supply a classname, this will be used as the root of all CSS transition styles
   * and you will need to supply your own styles for the transition states.
   *
   * @see https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-classNames
   */
  className?: string
  /** An optional nodeRef for ReactTransitionGroup's CSSTransition component that will be merged */
  nodeRef?: React.MutableRefObject<any>
  /** Props to pass to the container div that directly wraps any child elements. */
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  /** If true, the component will unmount when the transition is complete
   * @default true
   */
  unmountOnExit?: boolean
  /** Animation duration in milliseconds
   * @default 300
   */
  timeout?: number
  /** The distance to move the element during the transition
   * @default 10
   */
  distance?: number | string
  /** CSS easing function
   * @default 'ease'
   */
  easing?: string
  /** If true, the component will not render any styles
   * @default false
   */
  noStyles?: boolean
  /** The child elements to be transitioned */
  children: React.ReactNode
}

/**
 * The CSSTransition component is a wrapper for the React Transition Group's CSSTransition
 * component that makes the transition styles more flexible and easier to use.
 *
 * @see https://reactcommunity.org/react-transition-group/css-transition
 */
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
  const [styleId] = React.useState(id || generateId())
  const ref = useRef(null)
  const styles = getStyles(
    type,
    distance,
    timeout,
    easing,
    className || styleId
  )
  const isShowBool = typeof show === 'boolean'
  const isSwitchTransition = isSwitch || !isShowBool
  const t = styleId ? `${styleId}-${type}` : type
  const switchKey =
    isSwitchTransition && isShowBool
      ? show
        ? 'key-1'
        : 'key-0'
      : (show as string | number)
  return (
    <>
      {noStyles ? null : <Style root={styleId}>{styles}</Style>}
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
