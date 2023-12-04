import React, { useEffect, useState } from 'react'
import { cn } from '@maker-ui/utils'
import {
  extractValue,
  handleBoxResize,
  positionMap,
  replaceValue,
  validateCssUnit,
} from '../Grid/utils'
import { type ModuleAction } from '@/module'
import { SuccessIcon } from '../Icons'

interface ResizeHandleProps {
  padding: string
  margin: string
  dispatch: React.Dispatch<ModuleAction>
}

export const ResizeHandle = ({
  padding,
  margin,
  dispatch,
}: ResizeHandleProps) => {
  return (
    <div className="grid-box studio-reveal">
      {padding
        ?.split(' ')
        .map((v, i) => (
          <ResizeHandleItem
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

interface ResizeHandleItemProps {
  value: string
  fullValue: string // full padding or margin string
  index: number
  type: 'padding' | 'margin'
  dispatch: React.Dispatch<ModuleAction>
}

const ResizeHandleItem = ({
  value,
  fullValue,
  index,
  type,
  dispatch,
}: ResizeHandleItemProps) => {
  const [inputActive, setInputActive] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const pos = positionMap[index]
  const num = extractValue(value)
  const threshold = inputActive ? 90 : 20
  const positionClass =
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
        'resize-handle-item',
        'flex align-center justify-center',
        pos,
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
          className={cn(['resize-manual flex align-center', positionClass])}
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate()
          }}>
          <input
            className="resize-input"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
          <button type="submit" className="resize-submit">
            <SuccessIcon />
          </button>
        </form>
      ) : (
        <span
          className={cn(['resize-value', positionClass])}
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
