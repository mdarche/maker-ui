import React from 'react'
import { Box } from 'theme-ui'

import { MenuItem } from './common'

// TODO Add location hook here too

export const AccordionMenu = React.forwardRef(
  ({ menu = [], variant = 'accordion-menu', ...props }, ref) => (
    <Box
      ref={ref}
      as="ul"
      variant={variant}
      className="accordion-menu"
      {...props}>
      {menu.map((item, index) => (
        <MenuItem key={index} data={item} />
      ))}
    </Box>
  )
)
