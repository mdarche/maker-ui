/** @jsx jsx */
import { jsx } from '@maker-ui/css'

const JSXPage = () => {
  return (
    <div
      breakpoints={[200, 900, 1200]}
      css={{
        color: ['red', 'blue', 'purple'],
      }}>
      Test 1<span>Another test</span>
      <div className="yo">Orange</div>
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
