'use client'
import { ColorButton } from 'maker-ui/layout'
// import MDXPage from './test.mdx'
// import Readme from '@packages/accordion/README.mdx'

export default function Page() {
  return (
    <>
      <ColorButton
        renderProps={(currentMode, attributes) => (
          <button {...attributes} style={{ marginLeft: 10 }}>
            {currentMode} Custom
          </button>
        )}
      />
    </>
  )
}
