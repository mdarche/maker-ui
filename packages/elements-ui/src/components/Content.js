import React from 'react'
import { Box } from 'theme-ui'

import { useLayout } from '../context/ElementsContext'

// TODO - Figure out padding top vs Main and mobile padding

export const Content = React.forwardRef(({ layout, ...props }, ref) => {
  const [baseLayout, setLayout] = useLayout()

  if (layout !== undefined && layout !== baseLayout) {
    setLayout(layout)
  }

  return (
    <Box
      ref={ref}
      {...props}
      __css={{
        variant: `eui_layout.${baseLayout}`,
      }}
    />
  )
})
