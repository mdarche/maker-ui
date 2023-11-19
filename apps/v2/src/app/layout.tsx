import 'maker-ui/layout.css'
import 'maker-ui/lightbox.css'
import 'maker-ui/data.css'

import '@/styles/variables.css'
import '@/styles/global.css'
import { ResponsiveStyle } from 'maker-ui/layout'
import { options } from './workspace/layout'

export const metadata = {
  title: 'Maker UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        <link key="favicon" rel="shortcut icon" href="/favicon.ico" />
        {/* @ts-ignore */}
        <ResponsiveStyle options={options} />
      </head>
      <body>{children}</body>
    </html>
  )
}
