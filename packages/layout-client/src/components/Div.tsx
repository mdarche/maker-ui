import * as React from 'react'
import { Style, type StyleSettings } from '@maker-ui/style'
import { cn, generateId } from '@maker-ui/utils'

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StyleSettings {}

/**
 * The `Div` component is a client side buliding block that allows you to use Maker UI's
 * CSS-in-JS system to style a div element. This component is a helpful tool for prototyping but
 * you should opt to use pure CSS or SCSS for production (until Maker UI has a build solution).
 */
export const Div = ({
  root,
  breakpoints,
  css,
  className,
  children,
  mediaQuery,
  ...props
}: DivProps) => {
  const [styleId] = React.useState(root || generateId())

  return (
    <div className={cn([styleId, className])} {...props}>
      <Style
        root={styleId}
        css={css}
        mediaQuery={mediaQuery}
        breakpoints={breakpoints}
      />
      {children}
    </div>
  )
}
