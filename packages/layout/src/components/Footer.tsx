/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { mergeSelectors } from '../utils/helper'

import { ErrorContainer } from './Errors'

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
  maxWidth,
  background,
  _css,
  css,
  children,
  ...props
}: FooterProps) => {
  const hasRootStyles = maxWidth || _css
  const hasStyles = background || css
  return (
    <footer
      id={mergeSelectors(['footer', id])}
      role="contentinfo"
      css={hasRootStyles ? { background, ...(_css as object) } : undefined}
      {...props}>
      <div
        className="footer-container container flex"
        css={
          hasStyles
            ? {
                maxWidth,
                ...(css as object),
              }
            : undefined
        }>
        <ErrorContainer errorKey="footer">{children}</ErrorContainer>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
