import React, { useCallback, useEffect, useRef } from 'react'
import { cn, generateId } from '@maker-ui/utils'
import { useFocus } from '@maker-ui/hooks'
import { Portal } from '@maker-ui/modal'
import { Transition, type TransitionState } from '@maker-ui/transition'
import { ResponsiveCSS, Breakpoints, Style } from '@maker-ui/style'

import { getTransition, Position, TransitionType } from './position'

export type Offset = { x: number; y: number } | number

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  css?: ResponsiveCSS
  breakpoints?: Breakpoints
  /** A boolean that indicates if the popover is active. */
  show: boolean
  /** A setter for the show boolean that lets the popover close itself. */
  set: React.Dispatch<React.SetStateAction<boolean>>
  /** A React ref that is used to anchor the position of the Popover. */
  anchorRef: React.MutableRefObject<any>
  /** If true, the Popover will match the width of the anchorRef element. Useful for
   * dropdown menus.
   */
  matchWidth?: boolean
  /** The {x, y} position of the popover.
   * @default { x: "origin", y: "bottom" }
   */
  position?: Position
  /** The amount of space (in pixels) between the popover and its anchor element.
   * @default 0
   */
  offset?: Offset
  /** An optional ID selector or React ref that the popover will attach to. Defaults to
   * the document body.
   * @default 0
   */
  appendTo?: string | Element | null
  /** If true, the Popover will prevent keyboard focus from exiting the component.*/
  trapFocus?: boolean
  /** If true, the Popover will close when keyboard focus leaves the component.
   * @default true
   */
  closeOnBlur?: boolean
  /** Predefined transition styles that you can use to toggle the Popover.
   * @default "fade"
   */
  transition?: TransitionType
  /** Lets you customize the different states of the mount / unmount transition instead of using
   * the `transition` prop.
   * @example
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
   * @default 200
   */
  duration?: number
  /** @internal */
  _type?: 'popover' | 'dropdown' | 'tooltip'
  /** The child component of the Popover */
  children: React.ReactNode
}

/**
 * The `Popover` component lets you add supplemental views like a Tooltip or Dropdown
 * to a specified DOM node or the document body.
 *
 * Use the `Popover` to customize your own components, otherwise try out the pre-configured
 * `Tooltip` or `Dropdown` components.
 *
 * @link https://maker-ui.com/docs/elements/popovers
 */

export const Popover = ({
  show,
  set,
  id,
  anchorRef,
  matchWidth,
  position = { x: 'origin', y: 'bottom' },
  appendTo,
  trapFocus,
  offset = 0,
  closeOnBlur = true,
  transition = 'fade-down',
  className,
  breakpoints,
  css,
  duration = 200,
  transitionState,
  children,
  _type = 'popover',
  ...rest
}: PopoverProps) => {
  const popoverRef = useRef<any>(null)
  // Inner contents height and width
  const [state, setState] = React.useState({
    styleId: generateId(),
    height: 0,
    width: 0,
  })
  // Anchor element measurements
  const [box, setBox] = React.useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    documentTop: 0,
    measured: false,
  })

  /** Configure animation states based on `transition` and `transitionState` props */

  const animations = getTransition(transition)
  const popoverTransition: TransitionState = transitionState || {
    start: animations.start,
    entering: animations.enter,
    entered: animations.enter,
    exiting: animations.leave,
    exited: animations.leave,
  }

  /** Grab the latest getBoundingClientRect for a given React ref */

  function resize() {
    if (anchorRef.current) {
      const { top, bottom, left, right, x, y, height, width } =
        anchorRef.current.getBoundingClientRect()
      setBox({
        top,
        bottom,
        left,
        right,
        x,
        y,
        height,
        width,
        documentTop: top + document.documentElement.scrollTop,
        measured: true,
      })
    }
  }

  // Initial Measurement or changing Anchor Ref

  useEffect(() => {
    if (anchorRef.current) {
      resize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorRef])

  // Browser Resize

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Measure the popover's child container to calculate its height and width for
   * positioning & the `scale` transition.
   */
  const measuredRef = useCallback(
    (node: any) => {
      if (node && state.height === 0) {
        setState((s) => ({
          ...s,
          height: node.offsetHeight,
          width: node.offsetWidth,
        }))
      }
    },
    [state.height]
  )

  /**
   * Get all relevant focusable elements.
   */
  const { focusable } = useFocus({
    containerRef: popoverRef,
    focusRef: anchorRef,
    show,
  })

  /**
   * Set anchor width measurement
   */
  useEffect(() => {
    if (!box.measured) return
    if (matchWidth) {
      setState((s) => ({ ...s, width: box.width }))
    }
  }, [box, matchWidth])

  /**
   * Add focus trap and update tab sequence for popovers attached to body
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const setFocus = (
        close?: boolean,
        focus?: 'anchor' | 'next' | 'first' | 'last',
        preventDefault?: boolean
      ) => {
        if (close) set(false)
        if (preventDefault) e.preventDefault()

        return focus === 'anchor'
          ? anchorRef.current.focus()
          : focus === 'next'
          ? focusable.next?.focus()
          : focus === 'first'
          ? focusable.first?.focus()
          : focus === 'last'
          ? focusable.last?.focus()
          : anchorRef.current.focus()
      }

      switch (e.code) {
        case 'Esc':
        case 'Escape':
          return trapFocus
            ? setFocus(true, _type === 'dropdown' ? 'anchor' : 'next')
            : null
        case 'Tab':
          if (e.shiftKey && document.activeElement === focusable.first) {
            return trapFocus
              ? setFocus(false, 'last', true)
              : closeOnBlur
              ? setFocus(true, 'anchor', true)
              : null
          }
          if (!e.shiftKey && document.activeElement === focusable.last) {
            return trapFocus
              ? setFocus(false, 'first', true)
              : setFocus(
                  closeOnBlur ? true : false,
                  _type === 'dropdown' ? 'anchor' : 'next',
                  true
                )
          }
          return
        default:
          return
      }
    },
    [anchorRef, closeOnBlur, focusable, set, trapFocus, _type]
  )

  useEffect(() => {
    const ref = popoverRef.current
    ref?.addEventListener(`keydown`, handleKeyDown)

    return () => ref?.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

  /**
   * Get the popover's X position by calculating its distance to the anchor ref element.
   */
  const gapX = typeof offset === 'object' ? offset.x : offset
  const gapY = typeof offset === 'object' ? offset.y : offset

  const getX = () => {
    if (!box.measured) return
    return position.x === 'center'
      ? box.left + box.width / 2 - state.width / 2
      : position.x === 'left'
      ? box.left - state.width - gapX
      : position.x === 'right'
      ? box.right + gapX
      : box.left
  }

  /**
   * Get the popover's Y position by calculating its distance to the anchor ref element.
   */
  const getY = () => {
    if (!box.measured) return
    return position.y === 'top'
      ? box.documentTop - state.height - gapY
      : position.y === 'bottom'
      ? box.documentTop + box.height + gapY
      : position.y === 'center'
      ? box.documentTop + box.height / 2 - state.height / 2
      : 0
  }

  return typeof window !== 'undefined' && box.measured ? (
    <Portal root={appendTo}>
      <Transition
        show={show}
        nodeRef={popoverRef}
        timeout={duration}
        transitionState={popoverTransition}
        containerProps={{
          id,
          className: cn([
            'mkui-popover',
            className,
            show ? 'active' : undefined,
            state.styleId,
            'absolute',
          ]),
          style: {
            left: !appendTo ? getX() : undefined,
            top: !appendTo ? getY() : undefined,
            width: matchWidth ? state.width : undefined,
          },
          ...rest,
        }}>
        <Style
          root={state.styleId}
          breakpoints={breakpoints}
          css={{ display: 'block', zIndex: 99, ...css }}
        />
        <div ref={measuredRef} className="mkui-popover-inner">
          {children}
        </div>
      </Transition>
    </Portal>
  ) : null
}

Popover.displayName = 'Popover'
