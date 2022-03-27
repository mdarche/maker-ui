import { Spinner } from '@maker-ui/loaders'

export default function LoaderPage() {
  return (
    <div>
      <Spinner size={40} />
      <Spinner type="dot-spinner" />
      <Spinner type="dots" />
      <Spinner type="pulse" />
      <Spinner type="gear" />
      <Spinner type="bars" />
      <Spinner type="blocks" />
    </div>
  )
}
