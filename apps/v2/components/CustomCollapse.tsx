'use client'

import { Menu, type MenuItemProps } from 'maker-ui/layout'

export const CustomCollapseMenu = ({ menu }: { menu: MenuItemProps[] }) => {
  return (
    <Menu
      items={menu}
      expandButton={(s, atts) => (
        <button {...atts}>{s ? 'close' : 'open'}</button>
      )}
    />
  )
}
