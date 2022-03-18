import { ScrollReveal } from '@maker-ui/gsap'
import { Div, Grid } from 'maker-ui'

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function ScrollRevealPage() {
  return (
    <Div css={{ padding: 300 }}>
      <ScrollReveal distance={30} reverse css={{ h3: { fonSize: 30 } }}>
        <h3>YO!</h3>
      </ScrollReveal>
      <ScrollReveal group="party" distance="20%" reverse start="200px bottom">
        <Grid columns={['1fr', 'repeat(4, 1fr)']} gap={30}>
          {testArray.map((i) => (
            <Div
              key={i}
              className="party"
              css={{ height: 200, background: 'gray' }}
            />
          ))}
        </Grid>
      </ScrollReveal>
    </Div>
  )
}
