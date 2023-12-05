import React, { useRef } from 'react'
import { cn } from '@maker-ui/utils'

import {
  CollapseIcon,
  ColumnAddIcon,
  ColumnRemoveIcon,
  DragIcon,
  ExpandIcon,
  HideIcon,
  RevealIcon,
  SettingsIcon,
  TrashIcon,
} from '../Icons'
import { Editor } from '../Editor'
import type { ModuleAction } from '@/module'
import styles from './menu.module.css'

interface GridMenuProps {
  title?: string
  visible?: boolean
  columns: number
  collapse?: boolean
  dispatch: React.Dispatch<ModuleAction>
}

export const GridMenu: React.FC<GridMenuProps> = ({
  columns,
  visible,
  collapse,
  title = 'Grid',
  dispatch,
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [show, set] = React.useState(false)

  const toggleEditor = () => {
    set(!show)
    dispatch({ type: 'SET_ACTIVE_DRAG', payload: !show })
  }

  return (
    <>
      <div
        className={cn([
          styles['grid-menu'],
          'mkui-studio-reveal flex align-stretch',
        ])}>
        <button
          className={cn([
            styles['btn-drag'],
            'flex align-center justify-center',
          ])}>
          <DragIcon />
        </button>
        <div className={cn([styles['layout-group'], 'flex align-center'])}>
          <button ref={ref} onClick={toggleEditor} className="btn-settings">
            <SettingsIcon />
          </button>
          <button
            disabled={columns === 1}
            className={styles['btn-remove']}
            onClick={() =>
              dispatch({ type: 'SET_COLUMNS', payload: columns - 1 })
            }>
            <ColumnRemoveIcon />
          </button>
          <button
            className="btn-add"
            onClick={() =>
              dispatch({ type: 'SET_COLUMNS', payload: columns + 1 })
            }>
            <ColumnAddIcon />
          </button>
        </div>
        <button
          className={cn([styles['btn-title'], 'flex align-center'])}
          onClick={() =>
            dispatch({ type: 'SET_COLLAPSE', payload: !collapse })
          }>
          {title}
          {collapse ? <ExpandIcon /> : <CollapseIcon />}
        </button>
      </div>
      <div className={cn([styles['grid-actions'], 'mkui-studio-reveal'])}>
        <button
          className="btn-visibility"
          onClick={() =>
            dispatch({ type: 'SET_VISIBILITY', payload: !visible })
          }>
          {!visible ? (
            <HideIcon className={styles['icon-hide']} />
          ) : (
            <RevealIcon />
          )}
        </button>
        <button className="btn-delete">
          <TrashIcon />
        </button>
      </div>
      <Editor show={show} exit={toggleEditor} buttonRef={ref}>
        Children
      </Editor>
    </>
  )
}
