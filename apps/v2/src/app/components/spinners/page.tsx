import { Section } from 'maker-ui/layout'
import { Spinner } from 'maker-ui/spinners'

export default function LoaderPage() {
  return (
    <Section>
      <Spinner size={40} />
      <Spinner type="classic" />
      <Spinner type="dot-spinner" />
      <Spinner type="dots" />
      <Spinner type="pulse" />
      <Spinner type="gear" />
      <Spinner type="bars" />
      <Spinner type="blocks" />
    </Section>
  )
}
