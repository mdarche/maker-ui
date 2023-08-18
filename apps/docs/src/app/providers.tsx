'use client'

import { LayoutProvider } from 'maker-ui'
import { options } from './options'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <LayoutProvider options={options}>{children}</LayoutProvider>
)
