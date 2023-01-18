import * as React from 'react'

export const PageButton = () => {}

interface FormPageProps {
  children: React.ReactNode
}
export const Page = ({ children }: FormPageProps) => {
  return <div>{children}</div>
}
