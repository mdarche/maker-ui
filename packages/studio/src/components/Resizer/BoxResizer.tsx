import React, { useEffect, useState } from 'react'
import { cn } from '@maker-ui/utils'

import { extractValue, replaceValue, validateCssUnit } from '@/utils'
import { type ModuleAction } from '@/module'
import { handleBoxResize, positionMap } from './helper'
import { SuccessIcon } from '../Icons'
import styles from './resizer.module.css'

interface BoxResizerProps {
  padding: string
  margin: string
  dispatch: React.Dispatch<ModuleAction>
}

export const BoxResizer = ({ padding, margin, dispatch }: BoxResizerProps) => {
  return (
    <div className={cn([styles['box'], 'mkui-studio-reveal'])}>
      {padding
        ?.split(' ')
        .map((v, i) => (
          <BoxHandle
            key={positionMap[i]}
            type="padding"
            value={v}
            fullValue={padding}
            index={i}
            dispatch={dispatch}
          />
        ))}
    </div>
  )
}

interface BoxHandleProps {
  value: string
  fullValue: string // full padding or margin string
  index: number
  type: 'padding' | 'margin'
  dispatch: React.Dispatch<ModuleAction>
}

const BoxHandle = ({
  value,
  fullValue,
  index,
  type,
  dispatch,
}: BoxHandleProps) => {
  const [inputActive, setInputActive] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const pos = positionMap[index]
  const num = extractValue(value)
  const threshold = inputActive ? 90 : 20
  const absolute =
    typeof num === 'number' &&
    num <= threshold &&
    (pos === 'left' || pos === 'right')
      ? 'abs'
      : undefined

  useEffect(() => {
    if (value) {
      setInputValue(value)
    }
  }, [value])

  function handleUpdate() {
    const v = validateCssUnit(inputValue)
    if (!v) {
      setInputActive(false)
      return
    }
    const formatted = replaceValue(fullValue, index, v)
    dispatch({
      type: 'SET_STYLE',
      payload: { property: type, value: formatted },
    })
    setInputActive(false)
  }

  return (
    <div
      className={cn([
        styles['box-resizer'],
        'flex align-center justify-center',
        styles[`box-${pos}`],
      ])}
      style={{
        height: pos === 'top' || pos === 'bottom' ? value : undefined,
        width: pos === 'left' || pos === 'right' ? value : undefined,
      }}
      onMouseDown={(e) => {
        if (inputActive) return
        handleBoxResize(e, index, type, fullValue, dispatch)
      }}
      onDoubleClick={(e) => {
        if (inputActive) return
        const value = replaceValue(fullValue, index, '0px')
        dispatch({ type: 'SET_STYLE', payload: { property: type, value } })
      }}>
      {inputActive ? (
        <form
          className={cn([
            styles['resize-form'],
            absolute ? styles[absolute] : undefined,
            'flex align-center',
          ])}
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate()
          }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
          <button type="submit">
            <SuccessIcon />
          </button>
        </form>
      ) : (
        <span
          className={cn([
            styles['resize-value'],
            absolute ? styles[absolute] : undefined,
          ])}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => {
            e.stopPropagation()
            setInputActive(true)
          }}
          onMouseDown={(e) =>
            handleBoxResize(e, index, type, fullValue, dispatch)
          }>
          {value}
        </span>
      )}
    </div>
  )
}
