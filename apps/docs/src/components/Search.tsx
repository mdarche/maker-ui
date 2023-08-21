import { DocSearch } from '@docsearch/react'

export const Search = () => {
  return (
    <div className="doc-search flex align-center">
      <DocSearch
        appId="BH4D9OD16A"
        indexName="maker-ui"
        apiKey="375203709e8b66acf3df920a0129ecc4"
      />
    </div>
  )
}
