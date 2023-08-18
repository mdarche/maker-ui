interface PageLayoutProps {
  title: string
  library: string
  isComponent?: boolean
  fileSize?: string | number | null
  readme?: React.ReactElement
  children: React.ReactNode
}

export const PageLayout = ({
  title,
  library,
  fileSize,
  readme,
  isComponent = true,
  children,
}: PageLayoutProps) => {
  return (
    <div className="mkui-docs-page">
      <h1>{title}</h1>
      <div>
        <div>{library}</div>
        {isComponent && fileSize && <div>{fileSize} kb</div>}
      </div>
      {readme && <div className="mkui-mdx">{readme}</div>}
      {children}
    </div>
  )
}
