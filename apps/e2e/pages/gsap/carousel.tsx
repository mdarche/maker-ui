import { Div } from 'maker-ui'
import { Carousel } from '@maker-ui/gsap'

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
  return (
    <Div>
      <Carousel data={basicData} template={<BasicSlide />} settings={{}} />
    </Div>
  )
}
