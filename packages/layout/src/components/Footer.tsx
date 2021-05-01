/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { mergeSelector } from '../utils/helper'

import { ErrorBoundary } from './Errors'

interface FooterProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ResponsiveScale
  background?: string | string[]
  _css?: MakerProps['css']
}

/**
 * The `Footer` component stores important site information, links, and widgets at
 * the bottom of your layout.
 *
 * @link https://maker-ui.com/docs/layout/footer
 */

export const Footer = ({
  id,
  maxWidth = 'var(--maxWidth_footer)',
  background = 'var(--color-bg_footer)',
  _css,
  css,
  children,
  ...props
}: FooterProps) => {
  return (
    <footer
      id={mergeSelector('footer', id)}
      role="contentinfo"
      css={{ background, ...(_css as object) }}
      {...props}>
      <div
        className="container"
        css={{
          display: 'flex',
          maxWidth: maxWidth,
          margin: '0 auto',
          ...(css as object),
        }}>
        <ErrorBoundary errorKey="footer">{children}</ErrorBoundary>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
