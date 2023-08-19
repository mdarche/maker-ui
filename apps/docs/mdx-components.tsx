import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components'
// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    pre: (props) => <CodeBlock {...props} />,
    ...components,
  }
}
