import React, { useState, useEffect, useReducer } from 'react'
import { cn, merge } from '@maker-ui/utils'

import { UploadIcon } from '../Icons'
import { DragAndDrop } from './DragAndDrop'
import type { FileValidations } from '@/types'
import styles from './ImagePicker.styles'

export interface ImagePickerState {
  dropDepth: number
  multiFiles: boolean
  inDropZone: boolean
  dropArea: 'preview' | 'dropzone'
  fileList: File[]
}

type ResponsiveScale = string | number | (string | number)[]

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

export interface DropzoneSettings {
  className?: string
  component?: string | React.ReactElement
  activeComponent?: string | React.ReactElement
  position?: 'right' | 'left' | 'top' | 'bottom'
  showFileName?: boolean | 'bottom'
  width?: ResponsiveScale
  height?: ResponsiveScale
  icon?: false | React.ReactElement
  replaceWithPreview?: boolean
  hoverPreview?: boolean
  naked?: boolean
}

export interface ImagePickerProps {
  /** A className selector for the outermost image picker container */
  className?: string
  /** An ID selector for the outermost image picker container */
  id?: string
  /** An ID selector for the file upload input */
  inputId?: string
  /** An image URL or React component */
  preview?: string | React.ReactElement | false
  /** The size of the image preview. If square, use a number or array of numbers or an object
   * with responsive height and width values. */
  previewSize?:
    | ResponsiveScale
    | { height: ResponsiveScale; width: ResponsiveScale }
  /** Placeholder image, component, or SVG */
  placeholder?: React.ReactElement | string
  /** The file storage setter hook for single file uploads */
  setFile?: (f: File | undefined) => void
  /** The file storage setter hook for multiple file uploads */
  setFiles?: (f: File[] | undefined) => void
  /** A boolean that determines if the image preview should also be a hover dropzone.
   * Or an object of configurations for advanced layouts.
   */
  previewDropzone?:
    | false
    | { className?: string; component?: React.ReactElement }
  /** The position of the upload error message. */
  errorPosition?: 'bottom' | 'top' | 'side'
  /** Set to false if you don't need a dropzone. Otherwise you can use a configuration object
   * for advanced layouts.
   */
  dropzone?: false | DropzoneSettings
  /** A configuration object for file upload requirements. */
  validations?: FileValidations
  /** A custom component or string to be used inside the Remove Image button */
  removeImageComponent?: React.ReactElement | string
  /** Optional effect that runs when the image is removed. Helpful for removing cloudbased images as well. */
  onRemoveImage?: () => any
  /** Optional effect that runs when image files are added to state. */
  onUploadImage?: (url: Promise<string>) => any
  /** A custom cypress `data-cy` selector for the file input */
  cy?: string
}

const defaultDropzone: Partial<ImagePickerProps['dropzone']> = {
  component: 'Add image',
  activeComponent: 'Drop file',
  showFileName: true,
  width: 260,
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
  id,
  inputId,
  className,
  preview,
  previewSize = 150,
  errorPosition = 'bottom',
  placeholder,
  setFile,
  setFiles,
  validations,
  removeImageComponent = 'Remove Image',
  onRemoveImage,
  onUploadImage,
  cy,
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
   * Effect that saves a new image picker preview and sends data to parent component
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
    if (preview !== false) {
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
    let classNames: string[] = ['inline-flex', `position-${dropzone.position}`]

    if (dropzone.position === 'top' || dropzone.position === 'bottom') {
      classNames.push('flex-col')
    }

    return classNames.join(' ')
  }

  return (
    <div
      id={id}
      className={cn(['image-picker', getPosition(), className])}
      // css={
      //   dropzone && !dropzone.naked
      //     ? {
      //         '.preview-image': {
      //           position: 'relative',
      //           ...(typeof previewSize === 'object' &&
      //           !Array.isArray(previewSize)
      //             ? previewSize
      //             : {
      //                 height: previewSize,
      //                 width: previewSize,
      //               }),
      //         },
      //         '.dropzone:not(.preview-dropzone)': {
      //           position: 'relative',
      //           width: dropzone && dropzone.width,
      //           height:
      //             dropzone && dropzone.height ? dropzone.height : previewSize,
      //           alignItems:
      //             dropzone && !dropzone.height ? 'stretch' : undefined,
      //         },
      //         ...(styles as object),
      //         ...(css as object),
      //       }
      //     : css
      // }
      {...props}>
      {preview !== false && (placeholder || data.fileList.length || preview) ? (
        <div
          className={cn([
            'preview-container',
            isPreviewPrimary ? 'is-primary-dropzone' : undefined,
          ])}>
          <div className="preview flex flex-col">
            {image && typeof image === 'string' ? (
              <img src={image} className="preview-image" alt="Preview" />
            ) : preview ? (
              <div className="preview-image">{image}</div>
            ) : (
              <div className="preview-image">{placeholder}</div>
            )}
            {isPreviewDropzone ? (
              <DragAndDrop
                inputId={inputId}
                settings={{
                  showFileName: false,
                  height: '100%',
                  width: '100%',
                  icon: <UploadIcon />,
                }}
                isHoverPreview
                data={data}
                dispatch={dispatch}
                setErrors={setErrors}
                fileValidations={validations}
              />
            ) : null}
          </div>
          {data.fileList[0] || canRemoveImage ? (
            <button
              type="button"
              className="btn-remove width-100"
              onClick={removeImage}>
              {removeImageComponent}
            </button>
          ) : null}
        </div>
      ) : null}
      {showDropzone() ? (
        <DragAndDrop
          inputId={inputId}
          settings={dropzone as DropzoneSettings}
          data={data}
          dispatch={dispatch}
          setErrors={setErrors}
          fileValidations={validations}
          cy={cy}
        />
      ) : null}
      {errors ? (
        <div className={cn(['upload-error absolute', errorPosition])}>
          {errors.map((message, i) => (
            <div key={i}>{message}</div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

ImagePicker.displayName = 'ImagePicker'
