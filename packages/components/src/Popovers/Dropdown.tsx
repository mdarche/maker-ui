import React, { useState, useRef } from 'react'
import { Button } from 'maker-ui'

import { Popover } from './Popover'

interface DropdownProps {
  buttonVariant?: string | string[]
  buttonInner?: string | React.ReactElement
  matchWidth?: boolean
  trapFocus?: boolean
  sx?: any
  children: React.ReactElement | React.ReactElement[]
}

export const Dropdown = ({
  buttonVariant = 'dropdownButton',
  buttonInner = 'Dropdown',
  matchWidth = false,
  trapFocus = false,
  sx,
  children,
}: DropdownProps) => {
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const [show, set] = useState(true)

  return (
    <>
      <Button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={show}
        onClick={e => set(!show)}
        sx={{ variant: buttonVariant, width: 300, ...sx }}>
        {buttonInner}
      </Button>
      <div ref={dropdownRef}>
        <Popover
          appendTo={dropdownRef.current}
          role="listbox"
          trapFocus={trapFocus}
          anchorRef={buttonRef}
          anchorWidth={matchWidth}
          show={show}
          set={set}
          transition="scale">
          {children}
        </Popover>
      </div>
    </>
  )
}
