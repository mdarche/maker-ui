'use client'

import { Menu, type MenuItem } from 'maker-ui/layout'

export const CustomCollapseMenu = ({ menu }: { menu: MenuItem[] }) => {
  return (
    <Menu
      items={menu}
      expandButton={(s, atts) => (
        <button {...atts}>{s ? 'close' : 'open'}</button>
      )}
    />
  )
}
