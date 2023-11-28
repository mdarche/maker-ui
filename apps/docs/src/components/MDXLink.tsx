import Link from 'next/link'

interface MDXLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
}

export const MDXLink = ({ href, children }: MDXLinkProps) => {
  if (href?.startsWith('/')) {
    return <Link href={href}>{children}</Link>
  }

  const onPage = href?.startsWith('#')

  const attributes = !onPage
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : undefined

  return (
    <a href={href} {...attributes}>
      {children}
    </a>
  )
}
