/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { LayoutProps } from './types'

interface MainProps extends LayoutProps, React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
}

/**
 * Use the `Main` component to wrap your layout's main content.
 *
 * @see https://maker-ui.com/docs/main
 */

export const Main = forwardRef<HTMLDivElement, MainProps>(
  ({ variant = 'main', background, bg, ...props }, ref) => (
    <main
      ref={ref}
      id="content"
      role="main"
      sx={{ bg, background, variant, flex: 1 }}
      {...props}
    />
  )
)

Main.displayName = 'Main_MakerUI'
