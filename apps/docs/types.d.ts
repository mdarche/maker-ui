declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module '*.md' {
  let MDComponent: (props: any) => JSX.Element
  export default MDComponent
}
