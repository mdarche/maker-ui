import * as React from 'react'

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
export const Main = ({ children, _type, ...props }: MainProps) => (
  <main role="main" {...props}>
    {children}
  </main>
)

Main.displayName = 'Main'
Main.defaultProps = { _type: 'main' }
