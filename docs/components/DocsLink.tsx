import Link from 'next/link'

interface DocsLinkProps {
  children: React.ReactNode
  href: string
}

export const DocsLink = ({ children, href }: DocsLinkProps) => {
  if (href.startsWith('/')) {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    )
  }

  const onPage = href.startsWith('#')

  const attributes = onPage
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
