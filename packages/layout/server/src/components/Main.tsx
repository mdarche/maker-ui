import * as React from 'react'
import { cn } from '@maker-ui/utils'

export interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Internal prop to denote child node type */
  _type?: 'main'
}

/**
 * The `Main` component wraps your layout's main content.
 * Test
 *
 * @link https://maker-ui.com/docs/layout/main
 */
export const Main = ({ id, children, _type, ...props }: MainProps) => (
  <main id={cn(['content', id])} {...props}>
    {children}
  </main>
)

Main.displayName = 'Main'
Main.defaultProps = { _type: 'main' }
