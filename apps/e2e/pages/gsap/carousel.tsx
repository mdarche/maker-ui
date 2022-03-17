import { Div } from 'maker-ui'
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
      <Div css={{ marginTop: 30 }}>
        <Carousel
          data={array}
          template={<BasicSlide />}
          controls={[index, setIndex]}
          settings={{}}
        />
      </Div>
    </>
  )
}
