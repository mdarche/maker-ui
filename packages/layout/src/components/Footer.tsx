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
  maxWidth = 'var(--maxWidth_footer)',
  background = 'var(--color-bg_footer)',
  _css,
  css,
  children,
  ...props
}: FooterProps) => {
  return (
    <footer
      id={mergeSelectors(['footer', id])}
      role="contentinfo"
      css={{ background, ...(_css as object) }}
      {...props}>
      <div
        className="container flex"
        css={{
          maxWidth,
          ...(css as object),
        }}>
        <ErrorContainer errorKey="footer">{children}</ErrorContainer>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
