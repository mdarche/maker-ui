import { Section } from '@maker-ui/layout'
import { Carousel } from '@/client'

export default function CarouselPage() {
  const colors = ['red', 'orange', 'purple', 'blue']
  return (
    <Section>
      <Carousel>
        {colors.map((c) => (
          <div
            key={c}
            className="flex align-center justify-center"
            style={{ color: 'white', height: 400, background: c }}>
            {c}
          </div>
        ))}
      </Carousel>
    </Section>
  )
}
