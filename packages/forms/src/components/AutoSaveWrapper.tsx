import React, { useEffect, useState } from 'react'
import { CSSTransition } from '@maker-ui/transition'
import { AutoSaveSettings } from '@/types'
import { useField, useForm } from '@/hooks'
import { Spinner } from '@maker-ui/spinners'
import { ErrorIcon, ValidateIcon } from './Icons'

interface AutoSaveWrapperProps {
  name: string
  children: React.ReactNode
  settings: AutoSaveSettings
  formError?: boolean
}

type StatusType = 'active' | 'inactive' | 'success' | 'error'

export const initial: AutoSaveSettings = {
  indicator: (
    <Spinner type="classic" size={20} colors={{ primary: '#d2d2d2' }} />
  ),
  successIcon: <ValidateIcon css={{ height: 20, fill: '#3aca3a' }} />,
  errorIcon: <ErrorIcon css={{ height: 20, fill: '#e93030' }} />,
  timeout: 2500,
  position: 'left',
  padding: 30,
}

export const AutoSaveWrapper = ({
  name,
  settings,
  formError,
  children,
}: AutoSaveWrapperProps) => {
  const [status, setStatus] = useState<StatusType>('inactive')
  const { isSubmitting } = useForm()
  const { field, touched, error, value } = useField(name)
  const isRight = settings.position === 'right'

  useEffect(() => {
    // No status indicator
    if (error) {
      setStatus('inactive')
    }

    // Activate submission indicator
    if (isSubmitting && value !== field?.initialValue) {
      setStatus('active')
    }

    // Show failure or success status
    if (!isSubmitting && status === 'active') {
      const timer = setTimeout(() => {
        setStatus(formError ? 'error' : 'success')
      }, 200)
      return () => clearTimeout(timer)
    }

    // Return to normal status
    if (status === 'error' || status === 'success') {
      const timer = setTimeout(() => {
        setStatus('inactive')
      }, settings.timeout)
      return () => clearTimeout(timer)
    }
  }, [
    error,
    formError,
    isSubmitting,
    touched,
    settings,
    status,
    value,
    field?.initialValue,
  ])

  function renderIndicator() {
    switch (status) {
      case 'active':
        return settings.indicator
      case 'success':
        return settings.successIcon
      case 'error':
        return settings.errorIcon
      case 'inactive':
      default:
        return null
    }
  }

  return (
    <div
      css={{
        position: 'relative',
        '> *:first-of-type:not(.autosave-indicator)': {
          width: '100%',
        },
      }}>
      {children}
      <div
        className="mkui_autosave"
        style={{
          position: 'absolute',
          right:
            isRight && settings.padding ? -1 * settings.padding : undefined,
          left:
            !isRight && settings.padding ? -1 * settings.padding : undefined,
          top: '50%',
          transform: 'translateY(-50%)',
        }}>
        <CSSTransition type="fade" show={status}>
          {renderIndicator()}
        </CSSTransition>
      </div>
    </div>
  )
}
