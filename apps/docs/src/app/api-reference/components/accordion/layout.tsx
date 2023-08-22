import type { Metadata } from 'next'

import { RefLayout } from '@/components'
import Readme from '@/packages/accordion/README.mdx'
import { getFileSize } from '@/utils'

// Fetch file size of the package
// Set up metadata

export const metadata: Metadata = {
  title: 'Accordion',
  description: 'A simple accordion component.',
}

export default async function AccordionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fileSize = await getFileSize('accordion/dist/index.mjs')

  return (
    <RefLayout
      title="Accordion"
      type="Component"
      library="maker-ui/accordion"
      github="/packages/accordion/README.mdx"
      fileSize={fileSize}
      readme={<Readme />}>
      {children}
    </RefLayout>
  )
}
