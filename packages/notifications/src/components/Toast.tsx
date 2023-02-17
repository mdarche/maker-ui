import React, { useRef, useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import { useToast } from '@/hooks'
import type { ToastProps } from '@/types'

export const Toast = ({ id, type, message, ...p }: ToastProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { icons, components, classNames, setInactive } = useToast()
  // Templates
  const _icon = p?.icon ? p.icon : icons && icons[type] ? icons[type] : null
  const _component = p?.component
    ? p?.component
    : components && components[type]
    ? typeof components[type] === 'function'
      ? (components[type] as Function)(message)
      : components[type]
    : null

  useEffect(() => {
    const toast = ref?.current
    const unmount = (e: AnimationEvent) => {
      if (e.animationName === 'mkui-toast-fade-out' && ref.current) {
        setInactive(id)
        ref.current.style.opacity = '0'
      }
    }
    toast?.addEventListener('animationend', unmount)
    return () => toast?.removeEventListener('animationend', unmount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return p?.active ? (
    <div
      ref={ref}
      className={cn([
        'mkui-toast',
        classNames?.toast,
        type,
        !p.active ? 'inactive' : undefined,
      ])}>
      {_component ?? (
        <>
          {_icon ? (
            <div className={cn(['mkui-toast-icon', classNames?.toast_icon])}>
              {_icon}
            </div>
          ) : null}
          <div className={cn(['mkui-toast-body', classNames?.toast_body])}>
            {message}
          </div>
        </>
      )}
    </div>
  ) : null
}
