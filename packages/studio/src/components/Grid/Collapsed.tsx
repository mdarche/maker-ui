import * as React from 'react'
import { ExpandIcon } from '../Icons'
import { ModuleAction } from '@/module'
import { ModuleProps } from '@/types'
import styles from './grid.module.css'

interface CollapsedProps {
  dispatch: React.Dispatch<ModuleAction>
  settings: ModuleProps['settings']
  columns: number
  gridTemplateColumns: string
}

export const Collapsed = ({
  dispatch,
  settings,
  columns,
  gridTemplateColumns,
}: CollapsedProps) => {
  return (
    <div className={styles['grid-collapse']}>
      <button
        className={styles['btn-expand']}
        onClick={() => dispatch({ type: 'SET_COLLAPSE', payload: false })}>
        <ExpandIcon />
        <span>{settings?.adminTitle}</span>
        <div
          className={styles['demo-grid']}
          style={{
            gridTemplateColumns,
            width: columns > 4 ? 20 : 15,
          }}>
          {[...Array(columns)].map((_, i) => (
            <div key={i} className={styles['demo-column']} />
          ))}
        </div>
      </button>
    </div>
  )
}
