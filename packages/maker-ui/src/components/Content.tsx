import React, { useEffect } from 'react'

import { Box } from './common'
import { BoxProps } from './props'
import { useOptions, useLayout } from '../context/OptionContext'
import { setBreakpoint } from '../utils/helper'

const format = value => (isNaN(value) ? value : `${value}px`)

interface ContentProps extends BoxProps {
  layout?: string
}

export const Content = React.forwardRef<HTMLElement, ContentProps>(
  ({ layout, ...props }, ref) => {
    const { content } = useOptions()
    const [baseLayout, setLayout] = useLayout()

    useEffect(() => {
      if (layout !== undefined && layout !== baseLayout) {
        setLayout(layout)
      }
    }, [layout, baseLayout, setLayout])

    const sidebarPartial: object | null =
      baseLayout === 'sidebar-content'
        ? {
            gridTemplateColumns: t =>
              setBreakpoint(content.breakIndex, [
                `1fr`,
                `${format(t.sizes.width_sidebar)} 1fr`,
              ]),
          }
        : baseLayout === 'content-sidebar'
        ? {
            gridTemplateColumns: t =>
              setBreakpoint(content.breakIndex, [
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
          minHeight: '80vh',
        }}
      />
    )
  }
)
