import * as React from 'react'

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Internal prop to denote child node type */
  _type?: 'main'
}

/**
 * The `Main` component wraps your layout's main content.
 *
 * @link https://maker-ui.com/docs/layout/main
 */
export const Main = ({ _type = 'main', children, ...props }: MainProps) => (
  <main role="main" {...props}>
    {children}
  </main>
)

Main.displayName = 'Main'
