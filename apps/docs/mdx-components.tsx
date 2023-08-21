import type { MDXComponents } from 'mdx/types'
import { CodeBlock, Heading, Callout, MDXLink } from '@/components'
// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    pre: (props) => <CodeBlock {...props} />,
    h2: (props) => <Heading level={2} {...props} />,
    h3: (props) => <Heading level={3} {...props} />,
    a: (props) => <MDXLink {...props} />,
    ...components,
  }
}
