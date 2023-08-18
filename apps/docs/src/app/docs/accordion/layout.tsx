import { PageLayout } from '@/app/PageLayout'
import Readme from '@packages/accordion/README.mdx'
import { getFileSize } from '@/utils'

// Fetch file size of the package

export default async function AccordionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fileSize = await getFileSize('accordion/dist/index.mjs')

  return (
    <PageLayout
      title="Accordion"
      library="maker-ui/accordion"
      fileSize={fileSize}
      readme={<Readme />}>
      {children}
    </PageLayout>
  )
}
