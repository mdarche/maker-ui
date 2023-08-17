import { Section, Style } from 'maker-ui'
import { generateId } from 'maker-ui/utils'
import { Div } from 'maker-ui/layout'

export default function LoaderPage() {
  const id = generateId()
  return (
    <>
      <Div css={{ color: 'blue' }}>test</Div>
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
              '&.chained': { color: 'red' },
              '.test.chained': { color: 'black' },
              '.className, .test': { color: 'blue' },
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
    </>
  )
}
