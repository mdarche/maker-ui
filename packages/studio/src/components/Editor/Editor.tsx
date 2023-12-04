import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Portal } from '@maker-ui/modal'
import { cn } from '@maker-ui/utils'
import { CloseIcon, LeftPanelIcon, RightPanelIcon, UndockIcon } from '../Icons'
import styles from './editor.module.css'

interface EditorProps {
  title?: string
  theme?: string
  type?: EditorType
  show: boolean
  buttonRef: React.RefObject<HTMLButtonElement>
  exit: () => void
  children: React.ReactNode
}

type EditorType = 'GRID' | 'COLUMN' | 'PAGE' | 'COMPONENT'
type EditorLayout = 'LEFT' | 'RIGHT' | 'UNDOCK'

const buttons: { name: EditorLayout; label: string; icon: ReactElement }[] = [
  {
    name: 'UNDOCK',
    label: 'Undock menu',
    icon: <UndockIcon />,
  },
  {
    name: 'LEFT',
    label: 'Dock menu to the left',
    icon: <LeftPanelIcon />,
  },
  {
    name: 'RIGHT',
    label: 'Dock menu to the right',
    icon: <RightPanelIcon />,
  },
]

export const Editor = ({
  title = 'Settings',
  theme,
  type = 'GRID',
  show,
  exit,
  buttonRef,
  children,
}: EditorProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<EditorLayout>('UNDOCK')
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
  }, [buttonRef, layout, show])

  // Handle dragging
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!ref.current || layout !== 'UNDOCK') return

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

  const handleChangeLayout = (type: EditorLayout) => {
    setLayout(type)
    if (layout === 'UNDOCK' && type !== 'UNDOCK' && ref.current) {
      ref.current.style.cssText = ''
    }
  }

  return show ? (
    <Portal>
      <div
        ref={ref}
        className={cn([styles.editor, styles[layout.toLowerCase()], theme])}
        style={
          layout === 'UNDOCK'
            ? {
                top: position.top,
                left: position.left,
              }
            : undefined
        }>
        <div className={cn([styles['editor-nav']])} onMouseDown={handleDrag}>
          <div className="title">{title}</div>
          <div className="flex">
            <div className={styles['layout-buttons']}>
              {buttons?.map((button) => (
                <button
                  key={button.name}
                  title={button.label}
                  className={cn([
                    styles['layout-button'],
                    layout === button.name ? styles['layout-active'] : '',
                  ])}
                  onClick={() => handleChangeLayout(button.name)}>
                  {button.icon}
                </button>
              ))}
            </div>
            <button className="btn-close" onClick={() => exit()}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className={styles['editor-content']}>
          <div className={styles['editor-menu']}></div>
          <div className={styles['editor-body']}>{children}</div>
        </div>
      </div>
    </Portal>
  ) : null
}
