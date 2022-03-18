import { Div, Section } from 'maker-ui'
import { Carousel } from '@maker-ui/gsap'
import { useState } from 'react'

// Example 1 - Basic
interface BasicSlideProps {
  greeting?: string
  bg?: string
}

const basicData: BasicSlideProps[] = [
  { greeting: 'Hello!', bg: '#ff8787' },
  { greeting: 'Hola!', bg: '#aeaefe' },
  { greeting: 'Bonjour!', bg: '#aefec7' },
  { greeting: 'Ciao!', bg: '#e9a0e9' },
]

const BasicSlide = ({ greeting, bg }: BasicSlideProps) => (
  <Div
    css={{
      background: bg,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
    }}>
    <p>{greeting}</p>
  </Div>
)

export default function CarouselPage() {
  const [index, setIndex] = useState(0)
  const [array, setArray] = useState(basicData)
  return (
    <>
      <Section _css={{ background: 'green' }}>
        <div className="flex justify-between">
          <div>
            <button onClick={() => setIndex(1)}>Go to Slide 2</button>
            <button onClick={() => setIndex(3)}>Go to Slide 4</button>
          </div>
          <div>
            <button
              onClick={() =>
                setArray((arr) => [
                  ...arr,
                  { greeting: 'New greeting', bg: 'black' },
                ])
              }>
              Add to array
            </button>
          </div>
        </div>
      </Section>
      <Div css={{ marginTop: 30 }}>
        <Carousel
          data={array}
          template={<BasicSlide />}
          controls={[index, setIndex]}
          settings={{}}
          // overlay={
          //   <Div className="absolute cover flex align-center justify-center">
          //     <h2>Test</h2>
          //   </Div>
          // }
        />
      </Div>
    </>
  )
}
