import { Section } from '@maker-ui/layout'
import { Style } from '@maker-ui/jss'
import { generateId } from '../../../../../packages/utils/dist'

export default function LoaderPage() {
  const id = generateId()
  return (
    <Section>
      <Style
        id={id}
        css={{
          span: { color: 'red' },
          // opacity: [20, 40],
          // backgroundColor: 'red',
          // // background: 'red',
          // svg: {
          //   color: 'red',
          //   path: { fill: ['blue', 'red'] },
          // },
          // color: ['red', 'blue'],
          '.test-selector': {
            opacity: 20,
            h2: {
              background: ['blue', 'black'],
            },
          },
        }}
      />
      <div className={id}>
        <span>Red</span>
        <div className="test-selector">
          <h2>Yo!</h2>
        </div>
      </div>
    </Section>
  )
}
