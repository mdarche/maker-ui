/** @jsx jsx */
import { jsx, type MakerProps } from '@maker-ui/css'
import { mergeSelectors } from '@maker-ui/utils'

interface MainProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {}

/**
 * The `Main` component wraps your layout's main content.
 *
 * @link https://maker-ui.com/docs/layout/main
 */

export const Main = ({ id, children, ...props }: MainProps) => (
  <main id={mergeSelectors(['content', id])} role="main" {...props}>
    {children}
  </main>
)

Main.displayName = 'Main'
