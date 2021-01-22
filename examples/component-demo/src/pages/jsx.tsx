/** @jsx jsx */
import { jsx, Global } from '@maker-ui/css'

const JSXPage = () => {
  return (
    <div
      css={{
        color: ['red', 'blue', 'purple'],
        span: {
          color: ['red', 'green'],
        },
        '.yo': {
          color: 'hotpink',
        },
      }}>
      Test 1<span>Another test</span>
      <div className="yo">Orange</div>
      <Global
        // breakpoints={[500, 800]}
        styles={{
          '.yo': { fontWeight: 'bold', color: ['purple', 'blue', 'green'] },
        }}
      />
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
