/** @jsx jsx */
import { jsx, type MakerProps } from '@maker-ui/css'
import { mergeSelectors } from '@maker-ui/utils'

import { ErrorContainer } from './Errors'

interface SidebarProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * The `Sidebar` component shows complementary content alongside the `Main` component..
 *
 * @link https://maker-ui.com/docs/layout/sidebar
 */

export const Sidebar = ({ className, children, ...props }: SidebarProps) => {
  return (
    <div
      className={mergeSelectors(['sidebar', className])}
      role="complementary"
      {...props}>
      <ErrorContainer errorKey="sidebar">{children}</ErrorContainer>
    </div>
  )
}

Sidebar.displayName = 'Sidebar'
