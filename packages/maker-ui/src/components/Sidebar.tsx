import React from 'react'

import { Box } from './common'
import { MakerProps } from './types'

const defaultProps = {
  as: 'aside',
  label: 'Sidebar',
}

/**
 * Use the `Sidebar` component for `content-sidebar` or `sidebar-content` layouts.
 * Add it inside the `Content` component and alongside the `Main` component.
 *
 * @see https://maker-ui.com/docs/sidebar
 */

export const Sidebar = React.forwardRef<HTMLElement, MakerProps>(
  (props, ref) => {
    return (
      <Box ref={ref} id="primary-sidebar" role="complementary" {...props} />
    )
  }
)

Sidebar.defaultProps = defaultProps
