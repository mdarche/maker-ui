import React, { useState } from 'react'
import { mergeSelectors, generateId } from 'maker-ui'
import { FileValidations, validateFile } from './helper'
import { ImagePickerState, Action, DropzoneSettings } from './ImagePicker'

interface DragAndDropProps {
  data: ImagePickerState
  isHoverPreview?: boolean
  settings: DropzoneSettings
  dispatch: React.Dispatch<Action>
  setErrors: (e: string[]) => void
  fileValidations?: FileValidations
}

/**
 * A component that enables ImagePicker to accept drag and drop file uploads in addition to
 * the traditional file input element.
 */
export const DragAndDrop = ({
  data,
  dispatch,
  setErrors,
  fileValidations,
  isHoverPreview = false,
  settings,
}: DragAndDropProps) => {
  const [inputId] = useState(generateId())
  const dropArea = isHoverPreview ? 'preview' : 'dropzone'

  /**
   * Handle file uploads via HTML Input element
   */
  async function onUpdateImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const v = validateFile(e.target.files[0], fileValidations)
      if (v.status) {
        dispatch({ type: 'ADD_FILE_TO_LIST', value: [e.target.files[0]] })
        setErrors([])
      } else {
        setErrors(v.errors)
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
        const v = validateFile(f, fileValidations)
        errors = [...errors, ...v.errors]
      })

      if (errors.length) {
        setErrors(errors)
      } else {
        dispatch({ type: 'ADD_FILE_TO_LIST', value: files })
        setErrors([])
      }

      dispatch({ type: 'SET_DROP_DEPTH', value: 0 })
      dispatch({ type: 'SET_IN_DROP_ZONE', value: false, dropArea })
    }
  }

  return (
    <div
      className={mergeSelectors([
        'dropzone flex',
        isHoverPreview
          ? 'preview-dropzone absolute cover flex align-center justify-center'
          : undefined,
        settings.className,
      ])}>
      <label className="hitbox cover flex" htmlFor={inputId}>
        <div
          className={mergeSelectors([
            'drag-area',
            'flex align-center justify-center flex-col width-100',
            data.inDropZone && dropArea === data.dropArea
              ? 'drag-active'
              : undefined,
          ])}
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}>
          {settings.icon ? (
            <div className="dropzone-icon">{settings.icon}</div>
          ) : null}
          {data.inDropZone
            ? settings.activeComponent
            : data.fileList[0] && settings.showFileName === true
            ? data.fileList[0].name
            : settings.component}
          {settings.showFileName === 'bottom' && data.fileList[0] ? (
            <div className="dropzone-filename">{data.fileList[0].name}</div>
          ) : null}
        </div>
      </label>
      <input
        id={inputId}
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={onUpdateImage}
      />
    </div>
  )
}

DragAndDrop.displayName = 'DragAndDrop'
