import React, { useState, useEffect, useReducer, isValidElement } from 'react'
import { cn, merge } from '@maker-ui/utils'

import { DragAndDrop } from './DragAndDrop'
import { UploadIcon } from '@/components'
import type { DropzoneSettings, ImagePickerProps } from '@/types'

export interface ImagePickerState {
  dropDepth: number
  multiFiles: boolean
  inDropZone: boolean
  dropArea: 'preview' | 'dropzone'
  fileList: File[]
}

export type Action =
  | {
      type: 'SET_DROP_DEPTH'
      value: ImagePickerState['dropDepth']
    }
  | {
      type: 'SET_IN_DROP_ZONE'
      value: ImagePickerState['inDropZone']
      dropArea: ImagePickerState['dropArea']
    }
  | {
      type: 'ADD_FILE_TO_LIST'
      value: ImagePickerState['fileList']
    }
  | {
      type: 'REMOVE_FILES'
    }

const defaultDropzone: Partial<DropzoneSettings> = {
  component: 'Add image',
  activeComponent: 'Drop file',
  showFileName: true,
  position: 'right',
  icon: <UploadIcon />,
  replaceWithPreview: false,
  hoverPreview: true,
}

const reducer = (state: ImagePickerState, action: Action) => {
  switch (action.type) {
    case 'SET_DROP_DEPTH':
      return { ...state, dropDepth: action.value }
    case 'SET_IN_DROP_ZONE':
      return { ...state, inDropZone: action.value, dropArea: action.dropArea }
    case 'ADD_FILE_TO_LIST':
      return {
        ...state,
        removeImage: false,
        fileList: state.multiFiles
          ? state.fileList.concat(action.value)
          : [...action.value],
      }
    case 'REMOVE_FILES':
      return { ...state, removeImage: true, fileList: [] }
    default:
      return state
  }
}

/**
 * Renders a flexible UI for uploading and previewing image files.
 * It supports drag-and-drop functionality as well as file size / type validation.
 */
export const ImagePicker = ({
  className,
  preview,
  errorPosition = 'bottom',
  placeholder,
  setFile,
  setFiles,
  fileValidation,
  removeImageComponent = 'Remove Image',
  onRemoveImage,
  onUploadImage,
  inputProps,
  ...props
}: ImagePickerProps) => {
  const [image, setImage] = useState(preview || placeholder)
  const [errors, setErrors] = useState<string[]>([])
  const [data, dispatch] = useReducer(reducer, {
    multiFiles: setFiles ? true : false,
    dropDepth: 0,
    inDropZone: false,
    dropArea: 'dropzone',
    fileList: [],
  })

  /** Merge prop settings with defaults */
  const dropzone =
    props.dropzone === false
      ? false
      : props.dropzone === undefined
      ? defaultDropzone
      : merge(defaultDropzone, props.dropzone)

  /* Boolean layout helpers */
  const canRemoveImage = preview && !data.fileList.length ? true : false
  const isPreviewDropzone = dropzone !== false && dropzone.hoverPreview
  const isPreviewPrimary = dropzone !== false && dropzone.replaceWithPreview
  const showDropzone = () => {
    if (isPreviewPrimary) {
      return data.fileList.length || preview ? false : true
    }
    if (dropzone) return true
  }

  /**
   * Function that saves a new image picker preview and sends data to parent component
   */
  async function onUpload() {
    if (data.fileList.length && !errors.length) {
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
      setErrors([])
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
    setErrors([])
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
      setErrors([])
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

  console.log('Image is', image)
  return (
    <div
      className={cn(['mkui-image-picker', getPosition(), className])}
      {...props}>
      {preview !== false && (preview || placeholder || data.fileList.length) ? (
        <div
          className={cn([
            'mkui-preview-area',
            isPreviewPrimary ? 'dz-primary' : undefined,
          ])}>
          <div className="mkui-preview flex">
            {/* {image && typeof image === 'string' ? (
              <img src={image} className="mkui-preview-image" alt="preview" />
            ) : image && isValidElement(image) ? (
              <div className="mkui-preview-image">{image}</div>
            ) : null} */}
            {image && typeof image === 'string' ? (
              <img src={image} className="mkui-preview-image" alt="preview" />
            ) : null}

            {isPreviewDropzone && (
              <DragAndDrop
                inputProps={inputProps}
                settings={{
                  showFileName: false,
                  icon: <UploadIcon />,
                }}
                isHoverPreview
                data={data}
                dispatch={dispatch}
                setErrors={setErrors}
                fileValidation={fileValidation}
              />
            )}
          </div>
          {data.fileList[0] || canRemoveImage ? (
            <button
              type="button"
              className="mkui-btn-remove"
              onClick={removeImage}>
              {removeImageComponent}
            </button>
          ) : null}
        </div>
      ) : null}
      {showDropzone() ? (
        <DragAndDrop
          inputProps={inputProps}
          settings={dropzone as DropzoneSettings}
          data={data}
          dispatch={dispatch}
          setErrors={setErrors}
          fileValidation={fileValidation}
        />
      ) : null}
      {errors && (
        <div className={cn(['mkui-upload-error absolute', errorPosition])}>
          {errors.map((message, i) => (
            <div key={i}>{message}</div>
          ))}
        </div>
      )}
    </div>
  )
}

ImagePicker.displayName = 'ImagePicker'
