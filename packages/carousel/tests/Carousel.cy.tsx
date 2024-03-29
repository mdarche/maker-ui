import React, { useState } from 'react'
import { Carousel } from '../src'

/**
 * @component
 * Carousel
 *
 * @tests
 * - Render with default props
 * - Prop: `controls`
 */

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
  <div
    style={{
      background: bg,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
    }}>
    <p>{greeting}</p>
  </div>
)

describe('Carousel', () => {
  /* Render with default props */
  it('renders with default props', () => {
    cy.mount(<Carousel data={basicData} template={<BasicSlide />} />)
  })

  /* Prop: `controls` */

  it('can be controlled with an external React.useState hook', () => {
    cy.mount(<ExternalDemo />)
  })
})

const ExternalDemo = () => {
  const [index, setIndex] = useState(0)
  return (
    <div>
      <Carousel
        data={basicData}
        template={<BasicSlide />}
        controls={[index, setIndex]}
      />
      <button onClick={() => setIndex(1)}>Slide 2</button>
      <button onClick={() => setIndex(3)}>Slide 4</button>
    </div>
  )
}
