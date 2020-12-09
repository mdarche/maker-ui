/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MakerProps, ResponsiveScale } from '../types'
import { ErrorBoundary } from './Errors'

interface FooterProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ResponsiveScale
  bg?: string | string[]
}

/**
 * The `Footer` component stores important site information, links, and widgets at
 * the bottom of your layout. It is not compatible with workspace layouts.
 *
 * @see https://maker-ui.com/docs/layout/footer
 */

export const Footer = ({
  maxWidth,
  variant = 'footer',
  sx,
  bg = 'bg_footer',
  children,
  ...props
}: FooterProps) => {
  return (
    <footer id="footer" role="contentinfo" sx={{ bg, variant }} {...props}>
      <div
        className="container"
        sx={{
          display: 'flex',
          maxWidth: maxWidth || (t => t.sizes.maxWidth_footer),
          mx: 'auto',
          ...sx,
        }}>
        <ErrorBoundary errorKey="footer">{children}</ErrorBoundary>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
