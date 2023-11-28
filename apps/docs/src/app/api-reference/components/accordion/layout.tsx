import type { Metadata } from 'next'

import Readme from '@/packages/accordion/README.mdx'
import { RefLayout } from '@/components'
import { getFileSize } from '@/utils'

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
      type="component"
      library="maker-ui/accordion"
      github="/packages/accordion/README.mdx"
      fileSize={fileSize}
      readme={<Readme />}>
      {children}
    </RefLayout>
  )
}
