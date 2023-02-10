import React, { useState, useEffect, useReducer } from 'react'
import { cn, merge } from '@maker-ui/utils'

import { Dropzone } from './Dropzone'
import type { ImagePickerProps } from '@/types'
import { defaultSettings, uploadReducer } from './state'

/**
 * Renders a flexible UI for uploading and previewing image files.
 * It supports drag-and-drop functionality as well as file size / type validation.
 */
export const ImagePicker = ({
  className,
  preview,
  previewDropzone = true,
  errorPosition = 'bottom',
  placeholder,
  setFile,
  setFiles,
  fileValidation,
  componentRemove = 'Remove',
  onRemoveImage,
  onUploadImage,
  inputProps,
  ...props
}: ImagePickerProps) => {
  const [image, setImage] = useState(preview || placeholder)
  const [data, dispatch] = useReducer(uploadReducer, {
    errors: [],
    multiFiles: setFiles ? true : false,
    dropDepth: 0,
    inDropZone: false,
    dropArea: 'dropzone',
    fileList: [],
  })
  /* Merge prop settings with defaults */
  const dropzone = props?.dropzone
    ? merge(defaultSettings, { ...props.dropzone, fileValidation, inputProps })
    : { ...defaultSettings, fileValidation, inputProps }

  /* Boolean layout helpers */
  const canRemoveImage = data.fileList.length ? true : false
  const showPreview =
    preview !== false && (placeholder || data.fileList.length || preview)
  const showDropzone =
    (dropzone.replaceWithPreview && data.fileList.length) ||
    props?.dropzone === false
      ? false
      : true

  /**
   * Function that saves a new image picker preview and sends data to parent component
   */
  async function onUpload() {
    if (data.fileList.length && !data.errors.length) {
      // Set the preview image to the uploaded file
      const url: Promise<string> = new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(data.fileList[0])
        reader.onloadend = () => {
          setImage(reader.result as string)
          resolve(reader.result as string)
        }
      })

      // Emit callback function if included in props
      if (onUploadImage) {
        onUploadImage(url)
      }
      // Send file or file array to the parent component
      if (setFile) {
        return setFile(data.fileList[0])
      }
      if (setFiles) {
        return setFiles(data.fileList)
      }
    }
  }

  /**
   * Listen for changes to fileList state and send data to parent component
   */
  useEffect(() => {
    if (data.fileList.length) {
      dispatch({ type: 'SET_ERRORS', value: [] })
      onUpload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.fileList])

  /**
   * Reset component when the parent issues a new preview URL
   */
  useEffect(() => {
    if (preview) {
      setImage(preview)
    }
    dispatch({ type: 'SET_ERRORS', value: [] })
  }, [preview])

  /**
   * Remove the current preview image or any uploaded files from preview and send
   * `undefined` output to parent
   */
  function removeImage() {
    if (onRemoveImage) {
      onRemoveImage()
    }
    if (canRemoveImage || data.fileList.length) {
      dispatch({ type: 'REMOVE_FILES' })
      setImage(placeholder)
      return setFile
        ? setFile(undefined)
        : setFiles
        ? setFiles(undefined)
        : null
    }
  }

  /**
   * Determine the flexbox position styles for the ImagePicker component's dropzone
   */
  function getPosition() {
    if (!dropzone) return ''
    let cns: string[] = ['inline-flex', `position-${dropzone.position}`]

    if (dropzone.position === 'top' || dropzone.position === 'bottom') {
      cns.push('flex-col')
    }

    return cns.join(' ')
  }

  const removeAttrs: React.HTMLAttributes<HTMLButtonElement> = {
    // @ts-ignore
    type: 'button',
    className: 'mkui-btn-remove naked',
    onClick: removeImage,
  }

  return (
    <div
      className={cn(['mkui-image-picker', getPosition(), className])}
      {...props}>
      {showPreview ? (
        <div
          className={cn([
            'mkui-preview-area',
            dropzone?.replaceWithPreview ? 'main-dropzone' : undefined,
          ])}>
          <div className="mkui-preview flex flex-col">
            {typeof image === 'string' ? (
              <img
                src={image as string}
                className="mkui-preview-image"
                alt="preview"
              />
            ) : image ? (
              <div className="mkui-preview-image">{image}</div>
            ) : null}
            {previewDropzone && (
              <Dropzone
                data={data}
                dispatch={dispatch}
                settings={{
                  ...dropzone,
                  showFileName: false,
                  overlay: true,
                }}
              />
            )}
          </div>
          {data.fileList[0] || canRemoveImage ? (
            typeof componentRemove === 'function' ? (
              componentRemove(removeAttrs)
            ) : (
              <button {...removeAttrs}>{componentRemove}</button>
            )
          ) : null}
        </div>
      ) : null}
      {showDropzone ? (
        <Dropzone data={data} dispatch={dispatch} settings={dropzone} />
      ) : null}
      {data.errors && (
        <div className={cn(['mkui-upload-error absolute', errorPosition])}>
          {data.errors.map((message, i) => (
            <div key={i}>{message}</div>
          ))}
        </div>
      )}
    </div>
  )
}
ImagePicker.displayName = 'ImagePicker'
