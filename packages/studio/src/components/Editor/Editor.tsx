import React, { useEffect, useRef, useState } from 'react'
import { Portal } from '@maker-ui/modal'
import { cn } from '@maker-ui/utils'
import { CloseIcon } from '../Icons'

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
  const width = 520
  const offsetX = 30
  const offsetY = -30

  useEffect(() => {
    if (buttonRef.current && !show) {
      const rect = buttonRef.current.getBoundingClientRect()
      const viewportCenter = window.innerWidth / 2

      let newLeft: number
      if (rect.left < viewportCenter) {
        newLeft = rect.right + offsetX // Open to the right
      } else {
        newLeft = rect.left - offsetX // Open to the left
      }

      newLeft = Math.max(0, Math.min(window.innerWidth - width, newLeft))

      setPosition({
        top: rect.top + offsetY + window.scrollY,
        left: window.innerWidth <= width ? 0 : newLeft,
      })
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonRef, show])

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
      if (!ref.current) return
      const dx = moveEvent.clientX - startPos.x
      const dy = moveEvent.clientY - startPos.y

      // Calculate new position
      let newTop = initialPos.top + dy
      let newLeft = initialPos.left + dx

      // Viewport dimensions
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Element dimensions
      const elementWidth = ref.current.offsetWidth
      const elementHeight = ref.current.offsetHeight

      // Clamping to the viewport
      newLeft = Math.max(0, Math.min(viewportWidth - elementWidth, newLeft))
      newTop = Math.max(0, Math.min(viewportHeight - elementHeight, newTop))

      setPosition({ top: newTop, left: newLeft })
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
        <div className={cn(['mkui-editor-inner', theme])}>
          <div className="mkui-editor-nav" onMouseDown={handleDrag}>
            <div className="title">{title}</div>
            <button className="btn-close" onClick={() => exit()}>
              <CloseIcon />
            </button>
          </div>
          <div className="mkui-editor-content">
            <div className="mkui-editor-subnav"></div>
            <div className="mkui-editor-body">{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  ) : null
}
