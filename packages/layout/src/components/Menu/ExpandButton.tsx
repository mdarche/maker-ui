import * as React from 'react'
import { mergeSelectors } from '../../utils/helper'

interface ExpandButtonProps {
  show: boolean
  set: (show: boolean) => void
}

/**
 * The `ExpandButton` is used in collapsible menus to open or close the
 * next group of nested menu items.
 *
 * @internal usage only
 * @todo add custom button support
 *
 */

export const ExpandButton = ({ show, set }: ExpandButtonProps) => {
  return (
    <button
      title="Expand Section"
      className={mergeSelectors([
        'submenu-toggle',
        show ? 'expanded' : undefined,
      ])}
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
