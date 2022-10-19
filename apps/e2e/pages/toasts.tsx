import { useToast } from '@maker-ui/notifications'
import { Section } from 'maker-ui'

export default function ToastsPage() {
  const { toast } = useToast()

  return (
    <Section css={{ padding: '100px 30px' }}>
      <button onClick={() => toast({ type: 'success', message: 'Help' })}>
        Show Success
      </button>
      {/* {/* <button onClick={() => showToast('ERROR')}>Show Error</button> */}
      <button onClick={() => toast({ type: 'error', message: 'Issue found' })}>
        Show Error
      </button>
      Here's a section
    </Section>
  )
}
