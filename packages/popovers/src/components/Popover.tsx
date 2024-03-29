import React, { useState, useLayoutEffect, useRef } from 'react'
import { cn } from '@maker-ui/utils'
import {
  useFocusTrap,
  useKeyboardShortcut,
  useResizeObserver,
  useWindowSize,
} from '@maker-ui/hooks'
import { Portal } from '@maker-ui/modal'
import { Transition, type TransitionState } from '@maker-ui/transition'

import { getTransition } from '../position'
import type { PopoverProps } from '@/types'
import { cssVariables } from '../variables'

/**
 * The `Popover` component lets you add supplemental views like a Tooltip or Dropdown
 * to a specified DOM node or directly to the document body.
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
  trapFocus = false,
  offset = 0,
  closeOnBlur = true,
  transition = 'fade-down',
  className,
  duration = 200,
  transitionState,
  styles,
  children,
  ...rest
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  // Inner contents height and width
  const [state, setState] = useState({
    popover: {
      height: 0,
      width: 0,
    },
    anchor: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0,
      height: 0,
      width: 0,
      documentTop: 0,
    },
    measured: false,
    isMeasuring: true,
  })
  const variables = cssVariables({
    tooltip: styles?.tooltip,
    dropdown: styles?.dropdown,
    popover: styles?.popover,
  })

  // Trap focus and handle keyboard esc key
  useKeyboardShortcut(
    [{ key: 'Escape', callback: () => set && set(false) }],
    undefined,
    set ? true : false
  )
  useFocusTrap({
    ref: popoverRef,
    anchor: anchorRef,
    active: show,
    trap: trapFocus,
    exitFocus: 'dynamic',
    exitCallback: () => set && set(false),
  })
  // Observe window resize
  useWindowSize(measureAnchor)
  // Observe anchor resize
  useResizeObserver({ ref: anchorRef, onResize: measureAnchor })
  // Observe popover inner content resize (when active)
  const { ref } = useResizeObserver({
    onResize: ({ height, width }) => {
      if (height && width) {
        setState((s) => ({
          ...s,
          popover: { height, width: matchWidth ? s.anchor?.width : width },
        }))
      }
    },
  })

  /** Configure animation states based on `transition` and `transitionState` props */

  const animations = getTransition(state.popover.height ? transition : 'none')
  const popoverTransition: TransitionState = (state.popover.height &&
    transitionState) || {
    start: animations.start,
    entering: animations.enter,
    entered: animations.enter,
    exiting: animations.leave,
    exited: animations.leave,
  }

  /** Grab the latest getBoundingClientRect for a the anchor React ref */

  function measureAnchor() {
    if (anchorRef.current) {
      const { top, bottom, left, right, x, y, height, width } =
        anchorRef.current.getBoundingClientRect()
      if (!height && !width) return
      setState((s) => ({
        ...s,
        popover: {
          ...s.popover,
          width: matchWidth ? width : s.popover.width,
        },
        anchor: {
          top,
          bottom,
          left,
          right,
          x,
          y,
          height,
          width,
          documentTop: top + document.documentElement.scrollTop,
        },
        measured: true,
        isMeasuring: false,
      }))
    }
  }

  /**
   * Measure the anchor ref element if it has not already been measured.
   */
  useLayoutEffect(() => {
    if (show && !state.isMeasuring) {
      setState((s) => ({ ...s, measured: false, isMeasuring: true }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  /**
   * Fire the resize function if the anchor ref is being measured.
   */
  useLayoutEffect(() => {
    if (state.isMeasuring) {
      measureAnchor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isMeasuring])

  /**
   * Get the popover's X and Y position by calculating its distance to the anchor ref element.
   *
   * This effect only fires if the anchor ref has already been measured and the `appendTo`
   * prop is not set.
   */
  function getPosition() {
    if (appendTo || !state.measured) return {}
    const gapX = typeof offset === 'object' ? offset.x : offset
    const gapY = typeof offset === 'object' ? offset.y : offset

    const x =
      position.x === 'center'
        ? state.anchor.left + state.anchor.width / 2 - state.popover.width / 2
        : position.x === 'left'
        ? state.anchor.left - state.popover.width - gapX
        : position.x === 'right'
        ? state.anchor.right + gapX
        : state.anchor.left

    const y =
      position.y === 'top'
        ? state.anchor.documentTop - state.popover.height - gapY
        : position.y === 'bottom'
        ? state.anchor.documentTop + state.anchor.height + gapY
        : position.y === 'center'
        ? state.anchor.documentTop +
          state.anchor.height / 2 -
          state.popover.height / 2
        : 0

    const offscreenX = x < 0 || x + state.popover.width > window.innerWidth
    const offscreenY = y < 0 || y + state.popover.height > window.innerHeight

    return {
      left: offscreenX
        ? position.x === 'left'
          ? 0
          : window.innerWidth - state.popover.width
        : x,
      top: offscreenY
        ? position.y === 'top'
          ? 0
          : window.innerHeight - state.popover.height
        : y,
    }
  }

  return (
    <Portal root={appendTo}>
      <Transition
        show={!state.popover.height ? true : show}
        nodeRef={popoverRef}
        timeout={duration}
        transitionState={popoverTransition}
        containerProps={{
          id,
          className: cn([
            'mkui-popover',
            className,
            show ? 'active' : undefined,
            'absolute',
          ]),
          style: {
            ...(variables || {}),
            ...getPosition(),
            width: matchWidth ? state.popover.width : undefined,
            visibility: !state.popover.height ? 'hidden' : undefined,
            opacity: !state.popover.height ? 0 : undefined,
            display: 'block',
            zIndex: 99,
          },
          ...rest,
        }}>
        <div ref={ref} className="mkui-popover-inner">
          {children}
        </div>
      </Transition>
    </Portal>
  )
}

Popover.displayName = 'Popover'
