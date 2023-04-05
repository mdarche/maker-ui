import * as React from 'react'

import {
  Layout,
  LayoutProvider,
  type MakerUIOptions,
  type MenuItemProps,
} from '../src'

export const testMenu: MenuItemProps[] = [
  { label: 'Home', path: '#' },
  { label: 'Page 1', path: '#' },
  { label: 'Page 2', path: '#' },
]

export const nestedMenu: MenuItemProps[] = [
  { label: 'One', path: '/' },
  { label: 'Two', path: '/two' },
  {
    label: 'Three',
    path: '#',
    submenu: [
      { label: 'Five', path: '/five' },
      { label: 'Six', path: '/six' },
    ],
  },
  { label: 'Four', path: '/four' },
]

/** Add all layout elements  */
export const LayoutWrapper = ({
  options,
  children,
}: {
  options?: MakerUIOptions
  children: React.ReactNode
}) => {
  return (
    <LayoutProvider options={options}>
      <Layout options={options}>{children}</Layout>
    </LayoutProvider>
  )
}
