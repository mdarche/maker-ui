import React from 'react'
import { Box } from 'theme-ui'

const defaultSettings = {
  isStriped: false,
  isBordered: false,
  isSelectable: false,
  search: false,
}

const SmartTable = React.forwardRef(
  ({ variant = 'table', settings, columns, data = [], ...props }, ref) => {
    return (
      <Box ref={ref} as="table" variant={variant} {...props}>
        <thead></thead>
        <tbody></tbody>
      </Box>
    )
  }
)

export default SmartTable
