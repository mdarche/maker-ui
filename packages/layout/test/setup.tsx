import * as React from 'react'
import { Layout, MakerUIOptions } from '../src'

const defaultOptions: MakerUIOptions = {}

const defaultStyles = {}

interface WrapperProps {
  options?: MakerUIOptions
  styles?: object
  children: React.ReactNode
}

// Utility wrapper that lets you change options or styles during each test.

export const Wrapper = ({
  options = defaultOptions,
  styles = defaultStyles,
  children,
}: WrapperProps) => {
  return (
    <Layout options={options} styles={styles}>
      {children}
    </Layout>
  )
}
