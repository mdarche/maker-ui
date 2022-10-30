import { useToast, ToastProvider } from '@maker-ui/notifications'
import { Div, Section } from 'maker-ui'

const DynamicToast = ({ message }: { message: string }) => {
  return (
    <Div
      className="flex align-center"
      css={{ border: '1px solid', background: 'gainsboro' }}>
      {message}
    </Div>
  )
}

const StaticToast = () => {
  return (
    <Div
      className="flex align-center"
      css={{ border: '1px solid', background: 'gainsboro', height: 300 }}>
      Success!
    </Div>
  )
}

export default function ToastsPage() {
  return (
    <ToastProvider
      settings={{
        clearCache: true,
        position: 'bottom-center',
        duration: 3,
        components: { success: (msg) => <DynamicToast message={msg} /> },
        classNames: {
          container: 'container-class',
          toast: 'toast-class',
          toast_icon: 'icon-class',
          toast_body: 'body-class',
        },
      }}>
      <Section css={{ padding: '100px 30px' }}>
        <PageInner />
      </Section>
    </ToastProvider>
  )
}

const PageInner = () => {
  const { toast } = useToast()
  return (
    <>
      <button onClick={() => toast({ type: 'success', message: 'Help' })}>
        Show Success
      </button>
      <button onClick={() => toast({ component: <StaticToast /> })}>
        Show Static Success
      </button>
      <button onClick={() => toast({ type: 'error', message: 'Issue found' })}>
        Show Error
      </button>
    </>
  )
}
