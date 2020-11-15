/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { MakerProps, ResponsiveScale } from './types'
import { ErrorBoundary } from './ErrorBoundary'

interface FooterProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ResponsiveScale
  bg?: string | string[]
}

/**
 * Use the `Footer` component to store important site information, links, and widgets at
 * the bottom of your layout.
 *
 * @see https://maker-ui.com/docs/footer
 */

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    { maxWidth, variant = 'footer', sx, bg = 'bg_footer', children, ...props },
    ref
  ) => {
    return (
      <ErrorBoundary>
        <footer
          ref={ref}
          id="footer"
          role="contentinfo"
          sx={{ bg, variant }}
          {...props}>
          <div
            className="container"
            sx={{
              display: 'flex',
              maxWidth: maxWidth || (t => t.sizes.maxWidth_footer),
              mx: 'auto',
              ...sx,
            }}>
            {children}
          </div>
        </footer>
      </ErrorBoundary>
    )
  }
)

Footer.displayName = 'Footer_MakerUI'
