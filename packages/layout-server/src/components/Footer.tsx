import { cn } from '@maker-ui/utils'
import * as React from 'react'

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Internal prop to denote child node type */
  _type?: 'footer'
}

/**
 * The `Footer` component stores important site information, links, and widgets at
 * the bottom of your layout.
 *
 * @link https://maker-ui.com/docs/layout/footer
 */
export const Footer = ({
  children,
  _type,
  className,
  ...props
}: FooterProps) => {
  return (
    <footer
      className={cn(['mkui-footer', className])}
      role="contentinfo"
      {...props}>
      <div className="container">{children}</div>
    </footer>
  )
}

Footer.displayName = 'Footer'
Footer.defaultProps = { _type: 'footer' }
