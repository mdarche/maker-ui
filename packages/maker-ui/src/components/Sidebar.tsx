import React from 'react'

import { Box } from './common'
import { MakerProps } from './props'

const defaultProps = {
  as: 'aside',
  label: 'Sidebar',
}

export const Sidebar = React.forwardRef<HTMLElement, MakerProps>(
  (props, ref) => {
    return (
      <Box ref={ref} id="primary-sidebar" role="complementary" {...props} />
    )
  }
)

Sidebar.defaultProps = defaultProps
