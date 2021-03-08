import * as React from 'react'
import { Button, Div, MakerProps, mergeSelector } from 'maker-ui'

import { Popover, PopoverProps } from './Popover'

interface DropdownProps {
  buttonInner?: React.ReactNode
  matchWidth?: boolean
  trapFocus?: boolean
  closeOnBlur?: boolean
  transition?: PopoverProps['transition']
  spring?: PopoverProps['spring']
  buttonCss?: MakerProps['css']
  _css?: MakerProps['css']
  css?: MakerProps['css']
  className?: string
  id?: string
  children: React.ReactNode
}

/**
 * The `Dropdown` component is a pre-built popover for revealing a menu or supplemental
 * content. It returns a customizable button and the corresponding dropdown content.
 *
 * @link https://maker-ui.com/docs/components/popovers
 */

export const Dropdown = ({
  buttonInner = 'Dropdown',
  matchWidth = false,
  trapFocus = false,
  closeOnBlur = true,
  transition = 'none',
  id,
  className,
  buttonCss,
  _css,
  css,
  children,
}: DropdownProps) => {
  const buttonRef = React.useRef(null)
  const dropdownRef = React.useRef(null)
  const [show, set] = React.useState(transition === 'scale' ? true : false)

  return (
    <Div
      id={id}
      className={mergeSelector('dropdown', className)}
      css={{ display: 'inline-block' }}>
      <Button
        ref={buttonRef}
        className="dropdown-btn"
        aria-haspopup="listbox"
        aria-expanded={show}
        onClick={() => set(!show)}
        css={{ ...(buttonCss as object) }}>
        {buttonInner}
      </Button>
      <Div className="dropdown-container" ref={dropdownRef}>
        <Popover
          appendTo={dropdownRef.current}
          role="listbox"
          show={show}
          set={set}
          css={css}
          _css={_css}
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
