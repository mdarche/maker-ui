import { mergeSelectors } from 'maker-ui'

interface CalloutProps {
  type: 'alert' | 'info' | 'suggestion'
  children: React.ReactNode
}

export const Callout = ({ children, type = 'suggestion' }: CalloutProps) => {
  return <div className={mergeSelectors(['callout', type])}>{children}</div>
}
