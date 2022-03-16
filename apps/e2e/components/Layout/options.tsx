import Link from 'next/link'
import { MakerUIOptions } from 'maker-ui'

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
      background: '#ffff',
      border: '#e2e2e2',
      bg_header: '#fff',
      bg_mobileMenu: '#000',
      bg_footer: '#fff',
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
    maxWidth: 900,
    maxWidthSection: 900,
  },
}
