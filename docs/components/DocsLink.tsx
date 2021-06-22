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

  return (
    <a
      href={href}
      target={onPage ? undefined : '_blank'}
      rel={onPage ? undefined : 'noopener noreferrer'}>
      {children}
    </a>
  )
}
