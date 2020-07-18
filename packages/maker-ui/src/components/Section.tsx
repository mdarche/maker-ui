/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { LayoutProps, ResponsiveScale } from './types'

interface SectionProps
  extends LayoutProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: ResponsiveScale
  maxWidth?: ResponsiveScale
}

/**
 * Use the `Section` component to add new content sections that support full-width
 * backgrounds with custom max-width inner content.
 *
 * @see https://maker-ui.com/docs/section
 */

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ maxWidth, bg, background, variant, id, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={className}
        sx={{ bg, background, variant, width: '100%' }}>
        <div
          className="container"
          sx={{
            maxWidth: maxWidth || (t => t.sizes.maxWidth_section),
            mx: 'auto',
          }}
          {...props}
        />
      </section>
    )
  }
)
