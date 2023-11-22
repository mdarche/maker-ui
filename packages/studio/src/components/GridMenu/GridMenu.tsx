import * as React from 'react'
import {
  CaretIcon,
  CollapseIcon,
  ColumnAddIcon,
  ColumnRemoveIcon,
  DragIcon,
  ExpandIcon,
  SettingsIcon,
  TrashIcon,
} from '../Icons'
import { cn } from '@maker-ui/utils'

interface GridMenuProps {
  columns: number
  addColumn: () => void
  removeColumn: () => void
  adminTitle?: string
  collapse?: boolean
  setCollapse: (collapse: boolean) => void
}

export const GridMenu: React.FC<GridMenuProps> = ({
  columns,
  addColumn,
  removeColumn,
  adminTitle,
  collapse,
  setCollapse,
}) => {
  return (
    <>
      <div className="grid-menu flex align-stretch">
        <button className="btn-drag flex align-center justify-center">
          <DragIcon />
        </button>
        <div className="layout-button-group flex align-center">
          <button className="btn-settings">
            <SettingsIcon />
          </button>
          <button
            disabled={columns === 1}
            className="btn-remove"
            onClick={() => removeColumn()}>
            <ColumnRemoveIcon />
          </button>
          <button className="btn-add" onClick={() => addColumn()}>
            <ColumnAddIcon />
          </button>
        </div>
        <button
          className={cn([
            'btn-title flex align-center',
            collapse ? 'collapsed' : '',
          ])}
          onClick={() => setCollapse(!collapse)}>
          {adminTitle ? adminTitle : 'Grid'}
          {collapse ? <ExpandIcon /> : <CollapseIcon />}
        </button>
      </div>
      <div className="grid-delete">
        <button className="btn-delete-section">
          <TrashIcon />
        </button>
      </div>
    </>
  )
}
