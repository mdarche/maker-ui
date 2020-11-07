import React, { useState, useRef } from 'react'
import { Button, Div } from 'maker-ui'

import { Popover } from './Popover'

interface DropdownProps {
  buttonVariant?: string | string[]
  buttonInner?: string | React.ReactElement
  matchWidth?: boolean
  trapFocus?: boolean
  closeOnBlur?: boolean
  sx?: any
  children: React.ReactElement | React.ReactElement[]
}

export const Dropdown = ({
  buttonVariant = 'dropdownButton',
  buttonInner = 'Dropdown',
  matchWidth = false,
  trapFocus = false,
  closeOnBlur = true,
  sx,
  children,
}: DropdownProps) => {
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const [show, toggle] = useState(true)

  return (
    <>
      <Button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={show}
        onClick={e => toggle(!show)}
        sx={{ variant: buttonVariant, width: 300, ...sx }}>
        {buttonInner}
      </Button>
      <Div ref={dropdownRef}>
        <Popover
          appendTo={dropdownRef.current}
          role="listbox"
          show={show}
          toggle={toggle}
          trapFocus={trapFocus}
          anchorRef={buttonRef}
          anchorWidth={matchWidth}
          closeOnBlur={closeOnBlur}
          transition="scale">
          {children}
        </Popover>
      </Div>
    </>
  )
}
