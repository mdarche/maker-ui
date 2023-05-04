import { Section } from 'maker-ui'
import { ScrollBox, Animate } from 'maker-ui/scroll'
import 'maker-ui/scroll.css'

export default function SocialPage() {
  return (
    <Section style={{ padding: 50 }}>
      <h3>ScrollBox</h3>
      <ScrollBox border="1px solid gainsboro" height={100} width={400}>
        <div
          className="flex flex-col justify-between"
          style={{ height: 200, background: 'gainsboro' }}>
          <div>Lets go!</div>
          <div>Lets go again!</div>
        </div>
      </ScrollBox>
      <h3>Animate</h3>
      <div style={{ height: 1000 }} />
      <Animate
        selector="grid-item"
        distance={100}
        // stagger={200}
        type="fade-up"
        bottom={-500}
        reverse
        markers>
        <div
          className="grid"
          style={{ gap: 30, gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="grid-item"
              style={{ height: 100, width: '100%', background: 'gainsboro' }}
            />
          ))}
        </div>
      </Animate>
      <h3>Animate Group</h3>
    </Section>
  )
}
