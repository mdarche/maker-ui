import * as React from 'react'
import { useTransition, animated, SpringConfig } from 'react-spring'
import { Div, DivProps, useMeasure, useMakerUI, MakerProps } from 'maker-ui'

import { Portal } from '../Portal'
import { getSign } from '../helper'
import { useFocus } from '../../hooks'

const AnimatedDiv = animated(Div)

export interface Position {
  x: 'left' | 'center' | 'right' | 'origin'
  y: 'top' | 'center' | 'bottom'
}

export interface PopoverProps extends Omit<DivProps, 'children'> {
  show: boolean
  toggle?: React.Dispatch<React.SetStateAction<boolean>>
  anchorRef?: React.MutableRefObject<any>
  anchorWidth?: boolean
  position?: Position
  gap?: { x: number; y: number }
  appendTo?: string | Element
  trapFocus?: boolean
  closeOnBlur?: boolean
  containerCss?: MakerProps['css']
  springConfig?: SpringConfig
  _type?: 'popover' | 'dropdown' | 'tooltip' // internal usage only
  transition?:
    | 'fade'
    | 'fade-down'
    | 'fade-up'
    | 'fade-left'
    | 'fade-right'
    | 'scale'
    | 'none' // TODO
  defer?: number
  children: React.ReactNode
}

/**
 * The `Popover` component lets you add supplemental views like a Tooltip or Dropdown
 * to a specified DOM node or the document body.
 *
 * Use the `Popover` to customize your own components, otherwise try out the pre-configured
 * `Tooltip` or `Dropdown` components.
 *
 * @see https://maker-ui.com/docs/components/popovers
 */

export const Popover = ({
  show,
  toggle,
  id,
  anchorRef,
  anchorWidth,
  position = { x: 'origin', y: 'bottom' },
  appendTo,
  trapFocus,
  gap = { x: 0, y: 0 },
  closeOnBlur = true,
  transition = 'fade',
  springConfig,
  containerCss,
  defer,
  _type = 'popover',
  css,
  children,
  ...rest
}: PopoverProps) => {
  const popoverRef = React.useRef(null)
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  const [initialRender, setInitialRender] = React.useState(true)
  const { options } = useMakerUI()
  const [, box] = useMeasure({
    externalRef: anchorRef,
    documentResize: true,
    timeout: defer || options.content.deferMeasurements,
  })

  /**
   * Measure the popover's child container to calculate its height and width for
   * positioning & the `scale` transition.
   */

  const measuredRef = React.useCallback(
    node => {
      if (node !== null && height === 0) {
        setHeight(node.offsetHeight)
        setWidth(node.offsetWidth)
      }
    },
    [height]
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
   * If transition = 'scale', activate the popover with `visibility: hidden`
   * to capture height measurement
   */

  React.useEffect(() => {
    if (transition === 'scale' && setInitialRender) {
      setInitialRender(false)
      toggle(false)
    }
  }, [transition, toggle])

  /**
   * Set anchor width measurement
   */

  React.useEffect(() => {
    if (!box) return
    if (anchorWidth) {
      setWidth(box.width)
    }
  }, [box, anchorWidth])

  /**
   * Add focus trap and update tab sequence for popovers attached to body
   */

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      const setFocus = (
        close?: boolean,
        focus?: 'anchor' | 'nextEl' | 'first' | 'last',
        preventDefault?: boolean
      ) => {
        if (close) toggle(false)
        if (preventDefault) e.preventDefault()

        return focus === 'anchor'
          ? anchorRef.current.focus()
          : focus === 'nextEl'
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
            ? setFocus(true, _type === 'dropdown' ? 'anchor' : 'nextEl')
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
                  _type === 'dropdown' ? 'anchor' : 'nextEl',
                  true
                )
          }
          return
        default:
          return
      }
    },
    [anchorRef, closeOnBlur, focusable, toggle, trapFocus, _type]
  )

  React.useEffect(() => {
    const ref = popoverRef.current
    ref?.addEventListener(`keydown`, handleKeyDown)

    return () => ref?.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

  /**
   * Configure the React-spring useTransition animation
   */

  const animate = useTransition(show ? [1] : [], {
    from: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition),
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0px,0px,0px)`,
      height: transition === 'scale' ? `${height}px` : undefined,
    },
    leave: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition),
    },
    config: springConfig,
  })

  /**
   * Get the popover's X position by calculating its distance to the anchor ref element.
   */

  const getX = () => {
    if (!box) return
    return position.x === 'center'
      ? box.left + box.width / 2 - width / 2
      : position.x === 'left'
      ? box.left - width - gap.x
      : position.x === 'right'
      ? box.right + gap.x
      : box.left
  }

  /**
   * Get the popover's Y position by calculating its distance to the anchor ref element.
   */

  const getY = () => {
    if (!box) return
    return position.y === 'top'
      ? box.documentTop - height - gap.y
      : position.y === 'bottom'
      ? box.documentTop + box.height + gap.y
      : position.y === 'center'
      ? box.documentTop + box.height / 2 - height / 2
      : 0
  }

  return (
    <Portal root={appendTo}>
      {animate(
        (props, item) =>
          item && (
            <AnimatedDiv
              id={id}
              ref={popoverRef}
              // TODO - remove w/ stable React-spring v9
              style={props as any}
              css={{
                position: 'absolute',
                display: 'block',
                zIndex: 99,
                left: _type !== 'dropdown' && getX(),
                top: _type !== 'dropdown' && getY(),
                width: anchorWidth && width,
                overflow: transition.includes('scale') && 'hidden',
                ...(css as object),
              }}
              {...rest}>
              <Div
                ref={measuredRef}
                css={{
                  ...(containerCss as object),
                  opacity: transition === 'scale' && initialRender && [0],
                  visibility: transition === 'scale' &&
                    initialRender && ['hidden'],
                }}>
                {children}
              </Div>
            </AnimatedDiv>
          )
      )}
    </Portal>
  )
}

Popover.displayName = 'Popover'

/**
 * Helper function that returns a CSS transform string
 */

const getTransform = (type: string) => {
  switch (type) {
    case 'fade-up':
    case 'fade-down':
      return `translate3d(0,${getSign(type)}10px,0)`
    case 'fade-left':
    case 'fade-right':
      return `translate3d(${getSign(type)}10px, 0, 0)`
    case 'scale':
    case 'fade':
    default:
      return `translate3d(0px,0px,0px)`
  }
}
