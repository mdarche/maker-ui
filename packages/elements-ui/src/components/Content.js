import React from 'react'
import { Box } from 'theme-ui'

import { useLayout } from '../context/ElementsContext'

// TODO - Figure out padding top vs Main and mobile padding

// - add and test the mx: auto to eui_layout variants

export const Content = React.forwardRef(
  ({ layout, maxWidth, gridGap, ...props }, ref) => {
    const [baseLayout, setLayout] = useLayout()

    if (layout !== undefined && layout !== baseLayout) {
      setLayout(layout)
    }

    return (
      <Box
        ref={ref}
        {...props}
        sx={{
          // mx: "auto",
          variant: `eui_layout.${baseLayout}`,
        }}
      />
    )
  }
)
