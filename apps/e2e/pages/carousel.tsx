import { Section } from 'maker-ui'
import { SEO } from '../components/SEO'
import { Button } from '@maker-ui/carousel'

export default function IndexPage() {
  return (
    <>
      <SEO title="Carousel" />
      <Section>
        <h1>Component Playground</h1>
        <Button />
      </Section>
    </>
  )
}
