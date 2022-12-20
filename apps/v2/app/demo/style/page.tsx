import { Section } from '@maker-ui/layout'
import { Style } from '@maker-ui/style'
import { generateId } from '@maker-ui/utils'

export default function LoaderPage() {
  const id = generateId()
  return (
    <Section>
      <Style
        root={id}
        css={{
          color: 'red',
          span: { color: 'red' },
          opacity: [0.2, 0.4],
          // backgroundColor: 'red',
          svg: {
            color: 'red',
            path: { fill: ['blue', 'red'] },
          },
          // color: ['red', 'blue'],
          '.test-selector': {
            opacity: 20,
            '&:hover': {
              color: 'orange',
            },
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
