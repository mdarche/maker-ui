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
      muted: '#878787',
      border: '#e2e2e2',
      input: '#fff',
      input_border: '#e2e2e2',
      input_error: '#ffe8e8',
      input_error_border: '#ffaaaa',
      input_active: '#d9ffee',
      input_disabled: '#e7e7e7',
      bg_header: '#fff',
      bg_mobileMenu: '#000',
      bg_sideNav: '#f3f3f3',
      bg_footer: '#fff',
    },
    dark: {
      link: 'blue',
      text: '#fff',
      background: '#000',
      muted: '#7e7e7e',
      border: '#333',
      input: '#242424',
      input_border: '#333',
      input_error: '#352120',
      input_error_border: '#893030',
      input_active: '#2e5843',
      input_disabled: '#424242',
      bg_header: '#000',
      bg_sideNav: '#181818',
      bg_mobileMenu: '#000',
      bg_footer: '#000',
    },
  },
  systemColorMode: true,
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
