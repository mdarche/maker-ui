import React, { useEffect, useRef, useState } from 'react'
import { cn, generateId } from '@maker-ui/utils'
import { Style } from '@maker-ui/style'

import { Popover } from './Popover'
import type { PopoverProps } from '@/types'
import { cssVariables } from '../variables'

interface DropdownProps
  extends Omit<PopoverProps, 'show' | 'set' | 'anchorRef'> {
  classNames?: {
    container?: string
    button?: string
    dropdown?: string
  }
  /** A slot that lets you supply a custom button or callback function to render
   * construct a button with the open state.
   * @default "Dropdown"
   */
  button?:
    | React.ReactNode
    | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
  /** Allows you to control the dropdown from an external `useState` hook*/
  controls?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

/**
 * The `Dropdown` component is a pre-built popover for revealing a menu or supplemental
 * content. It returns a customizable button and the corresponding dropdown content.
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
  classNames,
  controls,
  css,
  styles,
  children,
  ...props
}: DropdownProps) => {
  const [styleId] = useState(generateId())
  const [show, set] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const variables = cssVariables({ button: styles?.button }, 'dropdown')

  const attrs = {
    ref: buttonRef,
    className: cn([
      'mkui-btn-dropdown',
      classNames?.button,
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
    if (!closeOnBlur) return
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef?.current.contains(e.target as Node) &&
        !buttonRef?.current.contains(e.target as Node)
      ) {
        return controls ? controls[1](false) : set(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [closeOnBlur, controls])

  return (
    <div
      id={id}
      className={cn([
        'mkui-dropdown',
        styleId,
        className,
        classNames?.container,
      ])}
      style={{ ...(variables || {}), ...(props?.style || {}) }}
      {...props}>
      {typeof button === 'function' ? (
        button(controls ? controls[0] : show, attrs)
      ) : (
        <button {...attrs}>{button}</button>
      )}
      <Style root={styleId} css={css} />
      <div className="mkui-dropdown-inner" ref={dropdownRef}>
        <Popover
          show={controls ? controls[0] : show}
          set={controls ? controls[1] : set}
          {...{
            role: 'listbox',
            appendTo: dropdownRef.current,
            anchorRef: buttonRef,
            className: cn(['mkui-dropdown', classNames?.dropdown]),
            matchWidth,
            trapFocus,
            closeOnBlur,
            transition,
            styles,
          }}>
          {children}
        </Popover>
      </div>
    </div>
  )
}

Dropdown.displayName = 'Dropdown'
