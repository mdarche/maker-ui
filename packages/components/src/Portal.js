import { createPortal } from 'react-dom'

const Portal = ({ children, root }) => {
  if (typeof window !== `undefined`) {
    const link = root
      ? document.getElementById(root)
      : document.querySelector('body')

    return createPortal(children, link)
  }
  return children
}

export default Portal
