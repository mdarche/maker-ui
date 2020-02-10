import React, { useState } from 'react'
import { Box } from 'theme-ui'

import { MenuItem } from './common'

export const AccordionMenu = React.forwardRef(
  ({ menu = [], location, variant = 'accordion-menu', ...props }, ref) => (
    <Box
      ref={ref}
      as="ul"
      variant={variant}
      className="accordion-menu"
      {...props}>
      {menu.map((item, index) => (
        <MenuItem key={index} data={item} location={location} />
      ))}
    </Box>
  )
)
