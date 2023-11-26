import React, { useEffect, useRef, useState } from 'react'
import { Portal } from '@maker-ui/modal'
import { CloseIcon } from '../Icons'
import { cn } from '@maker-ui/utils'

interface EditorProps {
  title?: string
  theme?: string
  show: boolean
  buttonRef: React.RefObject<HTMLButtonElement>
  exit: () => void
  children: React.ReactNode
}

export const Editor = ({
  title = 'Settings',
  theme,
  show,
  exit,
  buttonRef,
  children,
}: EditorProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      // Ensure we never open out of the viewport
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      })
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonRef])

  // Handle dragging
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!ref.current) return

    const startPos = { x: e.clientX, y: e.clientY }
    const initialPos = {
      top: ref.current.offsetTop,
      left: ref.current.offsetLeft,
    }

    const onMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startPos.x
      const dy = moveEvent.clientY - startPos.y
      // Ensure we don't exceed the viewport
      setPosition({
        top: initialPos.top + dy,
        left: initialPos.left + dx,
      })
    }

    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return show ? (
    <Portal>
      <div
        ref={ref}
        className={cn(['mkui-editor', theme])}
        style={{
          top: position.top,
          left: position.left,
        }}>
        <div className="mkui-editor-nav" onMouseDown={handleDrag}>
          <div className="title">{title}</div>
          <button className="btn-close" onClick={() => exit()}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </Portal>
  ) : null
}
