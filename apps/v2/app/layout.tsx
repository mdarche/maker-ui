import '@maker-ui/layout/dist/index.css'
import '@maker-ui/layout/dist/client.css'

import '@/styles/variables.css'
import '@/styles/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
