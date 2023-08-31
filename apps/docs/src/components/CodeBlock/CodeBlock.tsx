import { CopyButton } from '../CopyButton/CopyButton'

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-language'?: string
}

export const CodeBlock = (props: CodeBlockProps) => {
  return (
    <>
      <div className="mkui-code-util absolute flex align-center justify-between">
        <div className="lang">{props['data-language']}</div>
        <div className="copy">
          <CopyButton />
        </div>
      </div>
      <div className="mkui-code-block">
        <pre {...props} />
      </div>
    </>
  )
}

CodeBlock.displayName = 'CodeBlock'
