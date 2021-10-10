import * as React from 'react'

interface ExpandButtonProps {
  show: boolean
  set: (show: boolean) => void
}

/**
 * The `ExpandButton` is used in collapsible menus to open or close the
 * next group of nested menu items.
 *
 * @internal usage only
 *
 */

export const ExpandButton = ({ show, set }: ExpandButtonProps) => {
  return (
    <button
      title="Expand Section"
      className="submenu-toggle"
      aria-expanded={show ? 'true' : 'false'}
      aria-label="Expand Section"
      onClick={() => set(!show)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className={show ? 'rotate' : undefined}>
        <path
          stroke="currentcolor"
          strokeWidth="2"
          fill="none"
          d="M14 6 L8 12 L2 6"
        />
      </svg>
    </button>
  )
}

ExpandButton.displayName = 'ExpandButton'
