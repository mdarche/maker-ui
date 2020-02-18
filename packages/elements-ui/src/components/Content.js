import React from 'react'
import { Box } from 'theme-ui'

import { useOptions, useLayout } from '../context/OptionContext'
import setBreak from '../config/breakpoint'

const format = value => (isNaN(value) ? value : `${value}px`)

// TODO - Figure out padding top vs Main. Default mobile padding ?

export const Content = React.forwardRef(({ layout, ...props }, ref) => {
  const { content } = useOptions()
  const [baseLayout, setLayout] = useLayout()

  if (layout !== undefined && layout !== baseLayout) {
    setLayout(layout)
  }

  const sidebarPartial =
    baseLayout === 'sidebar-content'
      ? {
          gridTemplateColumns: t =>
            setBreak(content.breakIndex, [
              `1fr`,
              `${format(t.sizes.width_sidebar)} 1fr`,
            ]),
        }
      : baseLayout === 'content-sidebar'
      ? {
          gridTemplateColumns: t =>
            setBreak(content.breakIndex, [
              `1fr`,
              `1fr ${format(t.sizes.width_sidebar)}`,
            ]),
        }
      : null

  return (
    <Box
      ref={ref}
      id="site-inner"
      {...props}
      __css={{
        variant: `eui_layout.${baseLayout}`,
        ...sidebarPartial,
        minHeight: '100vh',
      }}
    />
  )
})
