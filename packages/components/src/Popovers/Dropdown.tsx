import * as React from 'react'
import { Button, Div } from 'maker-ui'

import { Popover } from './Popover'

interface DropdownProps {
  buttonVariant?: string | string[]
  buttonInner?: React.ReactNode
  matchWidth?: boolean
  trapFocus?: boolean
  closeOnBlur?: boolean
  sx?: any
  children: React.ReactNode
}

/**
 * The `Dropdown` component is a pre-built popover for revealing a menu or supplemental
 * content. It returns a customizable button and the corresponding dropdown content.
 *
 * @see https://maker-ui.com/docs/components/popovers
 */

export const Dropdown = ({
  buttonVariant = 'dropdownButton',
  buttonInner = 'Dropdown',
  matchWidth = false,
  trapFocus = false,
  closeOnBlur = true,
  sx,
  children,
}: DropdownProps) => {
  const buttonRef = React.useRef(null)
  const dropdownRef = React.useRef(null)
  const [show, toggle] = React.useState(true)

  return (
    <Div sx={{ display: 'inline-block' }}>
      <Button
        ref={buttonRef}
        className="dropdown-button"
        aria-haspopup="listbox"
        aria-expanded={show}
        onClick={e => toggle(!show)}
        sx={{ variant: buttonVariant, width: 100, ...sx }}>
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
          transition="scale"
          _type="dropdown">
          {children}
        </Popover>
      </Div>
    </Div>
  )
}

Dropdown.displayName = 'Dropdown'
