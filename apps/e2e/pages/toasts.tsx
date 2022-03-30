import { useToast } from '@maker-ui/notifications'
import { Section } from 'maker-ui'

export default function ToastsPage() {
  const { showToast } = useToast()

  return (
    <Section css={{ padding: '100px 30px' }}>
      <button onClick={() => showToast('SUCCESS')}>Show Success</button>
      <button onClick={() => showToast('ERROR')}>Show Error</button>
      <button onClick={() => showToast('HELP')}>Show Help</button>
      Here's a section
    </Section>
  )
}
