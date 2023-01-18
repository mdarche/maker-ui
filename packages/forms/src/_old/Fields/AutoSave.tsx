import React, { useEffect, useState } from 'react'
import { Div } from '@maker-ui/primitives'
import { AutoSaveSettings } from '../types'
import { CSSTransition } from '@maker-ui/transition'
import { useField, useFormikContext } from 'formik'

interface AutoSaveProps {
  name: string
  children: React.ReactNode
  settings: AutoSaveSettings
  formError?: boolean
}

type StatusType = 'active' | 'inactive' | 'success' | 'error'

export const AutoSave = ({
  name,
  settings,
  formError,
  children,
}: AutoSaveProps) => {
  const [status, setStatus] = useState<StatusType>('inactive')
  const { isSubmitting } = useFormikContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, { touched, error, value, initialValue }] = useField(name)
  const isRight = settings.position === 'right'

  useEffect(() => {
    // No status indicator
    if (error) {
      setStatus('inactive')
    }

    // Activate submission indicator
    if (isSubmitting && value !== initialValue) {
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
    initialValue,
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
    <Div
      css={{
        position: 'relative',
        '> *:first-of-type:not(.autosave-indicator)': {
          width: '100%',
        },
      }}>
      {children}
      <div
        className="autosave-indicator"
        style={{
          position: 'absolute',
          right:
            isRight && settings.padding ? -1 * settings.padding : undefined,
          left:
            !isRight && settings.padding ? -1 * settings.padding : undefined,
          top: '50%',
          transform: 'translateY(-50%)',
        }}>
        <CSSTransition type="fade" show={status} css={{ display: 'flex' }}>
          {renderIndicator()}
        </CSSTransition>
      </div>
    </Div>
  )
}
