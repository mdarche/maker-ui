/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, type MakerProps, type ResponsiveScale } from '@maker-ui/css'
import { mergeSelectors } from '@maker-ui/utils'
import { ErrorContainer } from './Errors'

interface FooterProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  /** Overrides `footer.maxWidth` from Maker UI options. */
  maxWidth?: ResponsiveScale
  /** Overrides the Footer's default `--color-bg_footer` CSS variable that you can set in Maker UI options. */
  background?: string | string[]
  /** Applies css to the outer footer container. */
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
  className,
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
      className={className}
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
