import { Section } from 'maker-ui'
import { PageContents } from './PageContents'

interface RefLayoutProps {
  title: string
  library: string
  isComponent?: boolean
  fileSize?: string | number | null
  readme?: React.ReactElement
  children: React.ReactNode
}

export const RefLayout = ({
  title,
  library,
  fileSize,
  readme,
  isComponent = true,
  children,
}: RefLayoutProps) => {
  return (
    <div className="mkui-docs-page">
      <Section>
        <h1>{title}</h1>
        <div>
          <div>{library}</div>
          {isComponent && fileSize && <div>{fileSize} kb</div>}
        </div>
      </Section>
      <div className="mdx-container">
        {readme && (
          <div className="mdx-grid">
            <div className="mkui-mdx">{readme}</div>
            <PageContents />
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

RefLayout.displayName = 'RefLayout'
