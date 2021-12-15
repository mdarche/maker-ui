import * as React from 'react'
import { Button, Div, StyleObject, mergeSelectors } from 'maker-ui'

import { Popover, PopoverProps } from './Popover'

interface DropdownProps {
  button?:
    | React.ReactNode
    | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
  matchWidth?: boolean
  trapFocus?: boolean
  closeOnBlur?: boolean
  transition?: PopoverProps['transition']
  buttonCss?: StyleObject
  _css?: StyleObject
  css?: StyleObject
  className?: string
  id?: string
  children: React.ReactNode
  /** Allows you to control the dropdown from an external React.useState hook*/
  controls?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

/**
 * The `Dropdown` component is a pre-built popover for revealing a menu or supplemental
 * content. It returns a customizable button and the corresponding dropdown content.
 *
 * @todo - clean up external `controls` implementation
 *
 * @todo - known issue with scale transition and height measurements
 *
 * @link https://maker-ui.com/docs/elements/popovers
 */

export const Dropdown = ({
  button = 'Dropdown',
  matchWidth = false,
  trapFocus = false,
  closeOnBlur = true,
  transition = 'none',
  id,
  className,
  buttonCss,
  controls,
  _css,
  css,
  children,
}: DropdownProps) => {
  const buttonRef = React.useRef(null)
  const dropdownRef = React.useRef(null)
  const [show, set] = React.useState(transition === 'scale' ? true : false)

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
      <Div className="dropdown-container" ref={dropdownRef}>
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
      </Div>
    </Div>
  )
}

Dropdown.displayName = 'Dropdown'
