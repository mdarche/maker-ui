import * as React from 'react'

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
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
  _type = 'footer',
  children,
  ...props
}: FooterProps) => {
  return (
    <footer role="contentinfo" {...props}>
      <div className="container">{children}</div>
    </footer>
  )
}

Footer.displayName = 'Footer'
