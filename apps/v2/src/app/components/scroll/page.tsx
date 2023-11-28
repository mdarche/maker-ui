import { Section } from 'maker-ui/layout'
import { ScrollBox, Animate, ParallaxSection } from 'maker-ui/scroll'
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
      <h3>Parallax Section</h3>
      <div style={{ height: 200 }} />
      <ParallaxSection
        imageUrl="https://picsum.photos/2000/1000"
        speed={0.2}
        overlay="rgba(0,0,0,0.5)">
        <div
          className="title"
          style={{ fontSize: 30, textAlign: 'center', padding: '300px 20px' }}>
          Section Title
        </div>
      </ParallaxSection>
      <h3>Animate Group</h3>
      <p>Note: reverse for the stagger animation is not yet supported.</p>
      <Animate
        selector="grid-item"
        distance={10}
        duration="0.2s"
        stagger={100}
        type="fade-up"
        bottom={-200}>
        <div
          className="grid"
          style={{ gap: 30, gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className="grid-item"
              style={{ height: 100, width: '100%', background: 'gainsboro' }}
            />
          ))}
        </div>
      </Animate>
      <h3>Animate</h3>
      <Animate
        distance={100}
        duration="0.3s"
        type="fade-left"
        bottom={-200}
        // markers
        reverse>
        <div style={{ height: 300, background: 'gainsboro' }}>Test section</div>
      </Animate>
    </Section>
  )
}
