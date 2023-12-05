import React, { useReducer, useRef } from 'react'
import { cn, merge } from '@maker-ui/utils'

import { GridMenu } from '../GridMenu'
import { ExpandIcon } from '../Icons'
import { GapResizer, BoxResizer } from '../Resizer'
import { Column } from '../Column'

import { type ModuleProps } from '@/types'
import { type ModuleState, moduleReducer } from '@/module'
import { Collapsed } from './Collapsed'

const initialState: ModuleState = {
  id: 'g23ui897dlsd',
  pageId: '1',
  componentId: '1',
  currentBreakpoint: 'desktop', // TODO: get from context
  bp: 0,
  type: 'GRID',
  visible: true,
  activeDrag: false,
  collapse: false,
  columns: 3,
  styles: [
    {
      breakpoint: 'desktop',
      background: undefined,
      gap: '30px',
      margin: '0px 0px 0px 0px',
      padding: '30px 30px 30px 30px',
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  ],
  updatedAt: Date.now().toString(),
  createdAt: Date.now().toString(),
}

interface GridProps {
  module: ModuleProps & { type: 'GRID' }
}

export const Grid = ({ module }: GridProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [
    {
      bp, // Index of current breakpoint
      columns,
      activeDrag,
      collapse,
      visible,
      styles,
      settings,
    },
    dispatch,
  ] = useReducer(moduleReducer, merge(initialState, module || {}))

  return (
    <div
      className={cn([
        'grid-wrapper',
        activeDrag ? 'grid-active' : undefined,
        collapse ? 'collapse' : undefined,
        !visible ? 'invisible' : undefined,
      ])}
      style={
        {
          padding: styles[bp].padding,
          // '--studio-primary': '#6315ed',
          // '--studio-handle': '',
          // '--studio-handle-dark': '',
          // '--studio-handle-text': '',
          // '--studio-gray-100': '',
          // '--studio-gray-200': '',
        } as React.CSSProperties
      }>
      {collapse ? (
        <Collapsed
          gridTemplateColumns={styles[bp].gridTemplateColumns!}
          settings={settings}
          columns={columns}
          dispatch={dispatch}
        />
      ) : (
        <>
          <BoxResizer
            margin={styles[bp].margin!}
            padding={styles[bp].padding!}
            dispatch={dispatch}
          />
          <div
            ref={gridRef}
            className="grid"
            style={{
              gridTemplateColumns: styles[bp].gridTemplateColumns,
              gap: styles[bp].gap,
            }}>
            {[...Array(columns)].map((_, i) => (
              <Column key={i} />
            ))}
            <GapResizer
              columns={columns}
              gridTemplateColumns={styles[bp].gridTemplateColumns!}
              gap={styles[bp].gap!}
              dispatch={dispatch}
            />
          </div>
        </>
      )}
      <GridMenu
        title={settings?.adminTitle}
        collapse={collapse}
        columns={columns}
        visible={visible}
        dispatch={dispatch}
      />
    </div>
  )
}
