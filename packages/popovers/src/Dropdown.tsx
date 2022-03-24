import React, { useEffect, useRef, useState } from 'react'
import { Button, Div } from '@maker-ui/primitives'
import { mergeSelectors } from '@maker-ui/utils'
import type { MakerProps } from '@maker-ui/css'

import { Popover, PopoverProps } from './Popover'

interface DropdownProps {
  /** ID selector for the dropdown container */
  id?: string
  /** className selector for the dropdown container */
  className?: string
  /** A slot that lets you supply a custom button or use a callback function that lets you
   * construct a button with the open state.
   * @default "Dropdown"
   */
  button?:
    | React.ReactNode
    | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
  /** If true, the dropdown content will match the width of the button.
   * @default false
   */
  matchWidth?: boolean
  /** If true, the dropdown container will trap the keyboard focus until the dropdown is closed.
   * @default false
   */
  trapFocus?: boolean
  /** If true, the Dropdown will close when keyboard focus leaves the component.
   * @default true
   */
  closeOnBlur?: boolean
  /** Predefined transition styles that you can use to toggle the Dropdown.
   * @default "fade"
   */
  transition?: PopoverProps['transition']
  /** Responsive styles that are applied to the button if a custom button is not supplied */
  buttonCss?: MakerProps['css']
  /** Responsive styles that are applied to the dropdown container. */
  _css?: MakerProps['css']
  /** Responsive styles that are applied to the nested popover container. */
  css?: MakerProps['css']
  /** The contents of your dropdown component */
  children: React.ReactNode
  /** Allows you to control the dropdown from an external React.useState hook*/
  controls?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

/**
 * The `Dropdown` component is a pre-built popover for revealing a menu or supplemental
 * content. It returns a customizable button and the corresponding dropdown content.
 *
 * @todo - clean up external `controls` implementation
 * @todo - known issue with scale transition and height measurements
 *
 * @link https://maker-ui.com/docs/elements/popovers
 */

export const Dropdown = ({
  button = 'Dropdown',
  matchWidth = false,
  trapFocus = false,
  closeOnBlur = true,
  transition = 'fade',
  id,
  className,
  buttonCss,
  controls,
  _css,
  css,
  children,
}: DropdownProps) => {
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const [show, set] = useState(transition === 'scale' ? true : false)

  const buttonAttributes = {
    ref: buttonRef,
    className: mergeSelectors([
      'dropdown-btn',
      (controls ? controls[0] : show) ? 'active' : '',
    ]),
    'aria-haspopup': 'listbox' as 'listbox',
    'aria-expanded': controls ? controls[0] : show,
    onClick: () => (controls ? controls[1](!controls[0]) : set(!show)),
  }

  /**
   * Create / remove a click handler to detect when the user clicks outside of the
   * dropdown menu (if active)
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        closeOnBlur &&
        dropdownRef.current &&
        // @ts-ignore
        !dropdownRef.current.contains(event.target) &&
        // @ts-ignore
        !buttonRef.current.contains(event.target)
      ) {
        return controls ? controls[1](false) : set(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeOnBlur, controls])

  return (
    <Div
      id={id}
      className={mergeSelectors(['dropdown', className])}
      css={{ display: 'inline-block', ...(_css as object) }}>
      {typeof button === 'function' ? (
        button(controls ? controls[0] : show, buttonAttributes)
      ) : (
        <Button {...buttonAttributes} css={{ ...(buttonCss as object) }}>
          {button}
        </Button>
      )}
      <div className="dropdown-container" ref={dropdownRef}>
        <Popover
          appendTo={dropdownRef.current}
          role="listbox"
          show={controls ? controls[0] : show}
          set={controls ? controls[1] : set}
          css={css}
          trapFocus={trapFocus}
          anchorRef={buttonRef}
          anchorWidth={matchWidth}
          closeOnBlur={closeOnBlur}
          transition={transition}
          _type="dropdown">
          {children}
        </Popover>
      </div>
    </Div>
  )
}

Dropdown.displayName = 'Dropdown'
