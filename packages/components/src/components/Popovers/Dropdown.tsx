import * as React from 'react'
import { Button, Div, MakerProps } from 'maker-ui'

import { Popover, PopoverProps } from './Popover'

interface DropdownProps {
  buttonVariant?: string | string[]
  buttonInner?: React.ReactNode
  matchWidth?: boolean
  trapFocus?: boolean
  closeOnBlur?: boolean
  transition?: PopoverProps['transition']
  springConfig?: PopoverProps['springConfig']
  css?: MakerProps['css']
  children: React.ReactNode
}

/**
 * The `Dropdown` component is a pre-built popover for revealing a menu or supplemental
 * content. It returns a customizable button and the corresponding dropdown content.
 *
 * @see https://maker-ui.com/docs/components/popovers
 */

export const Dropdown = ({
  buttonInner = 'Dropdown',
  matchWidth = false,
  trapFocus = false,
  closeOnBlur = true,
  transition = 'scale',
  css,
  children,
}: DropdownProps) => {
  const buttonRef = React.useRef(null)
  const dropdownRef = React.useRef(null)
  const [show, toggle] = React.useState(transition === 'scale' ? true : false)

  return (
    <Div css={{ display: 'inline-block' }}>
      <Button
        ref={buttonRef}
        className="dropdown-button"
        aria-haspopup="listbox"
        aria-expanded={show}
        onClick={() => toggle(!show)}
        css={{ ...(css as object) }}>
        {buttonInner}
      </Button>
      <Div className="dropdown-container" ref={dropdownRef}>
        <Popover
          appendTo={dropdownRef.current}
          role="listbox"
          show={show}
          toggle={toggle}
          trapFocus={trapFocus}
          anchorRef={buttonRef}
          anchorWidth={matchWidth}
          closeOnBlur={closeOnBlur}
          transition={transition}
          _type="dropdown">
          {children}
        </Popover>
      </Div>
    </Div>
  )
}

Dropdown.displayName = 'Dropdown'
