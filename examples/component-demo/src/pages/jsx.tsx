/** @jsx jsx */
// import { jsx } from '@emotion/react'
import { jsx } from '@maker-ui/css'

const JSXPage = () => {
  return (
    <div
      breakpoints={['768px', '960px']}
      css={{ color: 'var(--color-primary)' }}>
      Test 1
    </div>
    // <div>
    //   <ul>
    //     <li>Test 2</li>
    //     <li>Test 3</li>
    //   </ul>
    //   <h2>Another Heading</h2>
    //   <div css={{ height: 5000, background: 'gainsboro' }} />
    // </div>
  )
}

export default JSXPage
