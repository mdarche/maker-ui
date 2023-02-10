import React, { useState } from 'react'
import { cn, generateId } from '@maker-ui/utils'

import { validateFile } from '@/helpers'
import type { UploadState, UploadAction } from './state'
import type { DropzoneSettings } from '@/types'

interface DropzoneProps {
  data: UploadState
  dispatch: React.Dispatch<UploadAction>
  settings?: DropzoneSettings
}

/**
 * A component that enables ImagePicker to accept drag and drop file uploads in addition to
 * the traditional file input element.
 */
export const Dropzone = ({ data, dispatch, settings: s }: DropzoneProps) => {
  const [inputId] = useState(s?.inputProps?.id || generateId())
  const dropArea = s?.overlay ? 'preview' : 'dropzone'

  /**
   * Handle file uploads via HTML Input element
   */
  async function onUpdateImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const v = validateFile(e.target.files[0], s?.fileValidation)
      if (v.status) {
        dispatch({ type: 'ADD_FILE_TO_LIST', value: [e.target.files[0]] })
      } else {
        dispatch({ type: 'SET_ERRORS', value: v.errors })
      }
    }
  }

  /**
   * Event: DragEnter
   */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: 'SET_DROP_DEPTH', value: data.dropDepth + 1 })
  }

  /**
   * Event: DragLeave
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (data.inDropZone) {
      dispatch({ type: 'SET_IN_DROP_ZONE', value: false, dropArea })
    }
    dispatch({ type: 'SET_DROP_DEPTH', value: data.dropDepth - 1 })
    if (data.dropDepth > 0) return
  }

  /**
   * Event: DragOver
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    e.dataTransfer.dropEffect = 'copy'
    if (!data.inDropZone) {
      dispatch({ type: 'SET_IN_DROP_ZONE', value: true, dropArea })
    }
  }

  /**
   * Event: Drop
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // @ts-ignore
    let files = [...e.dataTransfer.files]

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name)
      files = files.filter((f) => !existingFiles.includes(f.name))

      // Run Validation and save to state if successful
      let errors: string[] = []
      files.forEach((f) => {
        const v = validateFile(f, s?.fileValidation)
        errors = [...errors, ...v.errors]
      })

      if (errors.length) {
        dispatch({ type: 'SET_ERRORS', value: errors })
      } else {
        dispatch({ type: 'ADD_FILE_TO_LIST', value: files })
      }

      dispatch({ type: 'SET_DROP_DEPTH', value: 0 })
      dispatch({ type: 'SET_IN_DROP_ZONE', value: false, dropArea })
    }
  }

  return (
    <div
      className={cn([
        'mkui-dropzone flex',
        s?.overlay
          ? 'mkui-dropzone-overlay absolute cover align-center justify-center'
          : undefined,
        s?.className,
      ])}>
      <label
        className="mkui-dropzone-hitbox absolute cover flex"
        htmlFor={inputId}>
        <div
          className={cn([
            'mkui-drag-area',
            'flex align-center justify-center flex-col width-100',
            data.inDropZone && dropArea === data.dropArea
              ? 'drag-active'
              : undefined,
          ])}
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}>
          {s?.icon && <div className="mkui-dropzone-icon">{s?.icon}</div>}
          {data.inDropZone
            ? s?.activeComponent
            : data.fileList[0] && s?.showFileName
            ? data.fileList[0].name
            : s?.component}
        </div>
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        onChange={onUpdateImage}
        {...s?.inputProps}
      />
    </div>
  )
}

Dropzone.displayName = 'Dropzone'
