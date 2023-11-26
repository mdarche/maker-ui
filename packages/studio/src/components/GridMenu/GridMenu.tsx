import React, { useRef } from 'react'
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
import { cn } from '@maker-ui/utils'
import { GridAction } from '../Grid/Grid'
import { Editor } from '../Editor'

interface GridMenuProps {
  title?: string
  visible?: boolean
  columns: number
  collapse?: boolean
  dispatch: React.Dispatch<GridAction>
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
      <div className="grid-menu flex align-stretch">
        <button className="btn-drag flex align-center justify-center">
          <DragIcon />
        </button>
        <div className="layout-button-group flex align-center">
          <button ref={ref} onClick={toggleEditor} className="btn-settings">
            <SettingsIcon />
          </button>
          <button
            disabled={columns === 1}
            className="btn-remove"
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
          className={cn([
            'btn-title flex align-center',
            collapse ? 'collapsed' : '',
          ])}
          onClick={() =>
            dispatch({ type: 'SET_COLLAPSE', payload: !collapse })
          }>
          {title}
          {collapse ? <ExpandIcon /> : <CollapseIcon />}
        </button>
      </div>
      <div className="grid-actions">
        <button
          className="btn-visibility"
          onClick={() =>
            dispatch({ type: 'TOGGLE_VISIBILITY', payload: !visible })
          }>
          {!visible ? <HideIcon /> : <RevealIcon />}
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
