'use client'
import { Section } from 'maker-ui'
import { useToast, ToastProvider } from 'maker-ui/notifications'

const DynamicToast = ({ message }: { message: string }) => {
  return (
    <div
      className="flex align-center"
      style={{ border: '1px solid', background: 'gainsboro' }}>
      {message}
    </div>
  )
}

const StaticToast = () => {
  return (
    <div
      className="flex align-center"
      style={{ border: '1px solid', background: 'gainsboro', height: 300 }}>
      Success!
    </div>
  )
}

export function ToastsPage() {
  return (
    <ToastProvider
      settings={{
        clearCache: false,
        position: 'bottom-left',
        // padding: 50,
        // components: { success: (msg) => <DynamicToast message={msg} /> },
        classNames: {
          container: 'container-class',
          toast: 'toast-class',
          toast_icon: 'icon-class',
          toast_body: 'body-class',
        },
      }}>
      <Section style={{ padding: '100px 30px' }}>
        <PageInner />
      </Section>
    </ToastProvider>
  )
}

const PageInner = () => {
  const { toast } = useToast()
  return (
    <>
      <button onClick={() => toast({ type: 'success', message: 'Success!' })}>
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
