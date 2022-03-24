import Link from 'next/link'
import type { MakerUIOptions } from 'maker-ui'

export const options: MakerUIOptions = {
  linkFunction: function nextLink(
    path: string,
    children: React.ReactNode,
    attributes: object
  ) {
    return (
      <Link href={path}>
        <a {...attributes}>{children}</a>
      </Link>
    )
  },
  fonts: {
    body: 'Helvetica, Arial, sans-serif',
    heading: 'Helvetica, Arial, sans-serif',
    monospace: 'monospace',
  },
  colors: {
    light: {
      link: 'blue',
      text: '#000',
      background: '#fff',
      border: '#e2e2e2',
      bg_header: '#fff',
      bg_mobileMenu: '#000',
      bg_footer: '#fff',
    },
    dark: {
      link: 'blue',
      text: '#fff',
      background: '#000',
      border: '#333',
      bg_header: '#000',
      bg_mobileMenu: '#000',
      bg_footer: '#000',
    },
  },
  useColorDefaults: false,
  header: {
    maxWidth: 1200,
    navType: 'basic',
    mobileNavType: 'basic',
    sticky: true,
  },
  content: {
    maxWidth: '100%',
    maxWidthSection: 900,
  },
}
