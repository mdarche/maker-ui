'use client'
import { CollapseMenu, MenuItemProps } from './client'

export const CustomCollapseMenu = ({ menu }: { menu: MenuItemProps[] }) => {
  return (
    <CollapseMenu
      items={menu}
      expandButton={(s, atts) => (
        <button {...atts}>{s ? 'close' : 'open'}</button>
      )}
    />
  )
}
