import { PageContents } from './PageContents'

interface RefLayoutProps {
  title: string
  library: string
  type: 'Component' | 'Hook' | 'Function' | 'hidden'
  fileSize?: string | number | null
  github?: string
  readme?: React.ReactElement
  children: React.ReactNode
}

export const RefLayout = ({
  title,
  type = 'Component',
  library,
  fileSize,
  github,
  readme,
  children,
}: RefLayoutProps) => {
  return (
    <div className="mkui-ref-layout">
      <div className="mdx-container">
        {readme && (
          <div className="mdx-grid">
            <div className="mkui-mdx">
              <h1>{title}</h1>
              {type !== 'hidden' ? (
                <div className="ref-meta inline-flex align-center">
                  <div className="ref-type">{type}</div>
                  <div className="ref-lib">
                    {library}{' '}
                    {fileSize && <span className="size">{fileSize} kb</span>}
                  </div>
                </div>
              ) : null}
              {readme}
            </div>
            <PageContents github={github} />
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

RefLayout.displayName = 'RefLayout'
