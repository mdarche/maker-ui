import { Div, Section, Global } from 'maker-ui'
import { Carousel, SlideProps } from '@maker-ui/gsap'
import { useState } from 'react'
import Image from 'next/image'

import CosmosImage from '../../public/cosmos.jpeg'
import NYCImage from '../../public/nyc.jpeg'

// Example 1 - Basic

interface BasicSlideProps extends SlideProps {
  greeting?: string
  bg?: string
}

const basicData: BasicSlideProps[] = [
  { greeting: 'Hello!', bg: '#ff8787' },
  { greeting: 'Hola!', bg: '#aeaefe' },
  { greeting: 'Bonjour!', bg: '#aefec7' },
  { greeting: 'Ciao!', bg: '#e9a0e9' },
]

const BasicSlide = ({ greeting, bg, index }: BasicSlideProps) => (
  <Div
    css={{
      background: bg,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
    }}>
    <p>
      {greeting} - {index}
    </p>
  </Div>
)

// Example 2 - Custom Component Array

const components = [
  <Div>Component 1</Div>,
  <Div>Component 2</Div>,
  <Div>Component 3</Div>,
]

// Example 3 - Next.js Images

const images = [
  { url: CosmosImage, bg: 'red', onClick: () => console.log('LETS GO') },
  {
    url: NYCImage,
    bg: 'blue',
  },
]

const ImageSlide = ({
  url,
  isActive,
}: {
  url?: string
  isActive?: boolean
}) => {
  return (
    <Div
      className={isActive ? 'active' : undefined}
      css={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Div css={{ height: '100%', width: '100%', position: 'relative' }}>
        <Image
          src={url as string}
          alt="carousel-image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </Div>
    </Div>
  )
}

export default function CarouselPage() {
  const [index, setIndex] = useState(0)
  const [array, setArray] = useState(basicData)
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <>
      <Global styles={{ h1: { textAlign: 'center' } }} />
      <Section
        _css={{
          padding: 20,
          background: 'gainsboro',
          'button.active': { color: 'red' },
        }}>
        <div className="flex justify-between">
          <div>
            <button
              className={index === 1 ? 'active' : undefined}
              onClick={() => setIndex(1)}>
              Go to Slide 2
            </button>
            <button
              className={index === 3 ? 'active' : undefined}
              onClick={() => setIndex(3)}>
              Go to Slide 4
            </button>
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
            <button onClick={() => setShowOverlay((s) => !s)}>
              Toggle Overlay
            </button>
          </div>
        </div>
      </Section>
      <Div css={{ marginTop: 30 }}>
        <h1>Basic Data/Template Example</h1>
        <Carousel
          data={array}
          template={<BasicSlide />}
          controls={[index, setIndex]}
          settings={{
            autoPlay: false,
            slideWidth: ['100%'],
          }}
          overlay={
            showOverlay ? (
              <Div
                className="absolute cover flex align-center justify-center"
                css={{
                  width: '40%',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                }}>
                <h2>Test</h2>
              </Div>
            ) : undefined
          }
        />
      </Div>

      <Div css={{ marginTop: 80 }}>
        <h1>Custom / Interactive Slides</h1>
        <Carousel
          data={components}
          template="custom"
          // overlay={
          //   <Div className="absolute cover flex align-center justify-center">
          //     <h2>Test</h2>
          //   </Div>
          // }
        />
      </Div>

      <Div css={{ marginTop: 80 }}>
        <h1>Next.js Image Slides</h1>
        <Carousel
          key={1}
          data={images}
          template={<ImageSlide />}
          settings={{ dragTarget: 'overlay' }}
        />
      </Div>
    </>
  )
}
