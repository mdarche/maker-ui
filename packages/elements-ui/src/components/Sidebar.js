import React from 'react'
import { Box } from 'theme-ui'

export const Sidebar = React.forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      as={props.as || 'aside'}
      id="primary-sidebar"
      role="complementary"
      {...props}
    />
  )
})
