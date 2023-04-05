import * as React from 'react'
import { UploadIcon } from '@/components'
import { DropzoneSettings } from '@/types'

export interface UploadState {
  errors: string[]
  multiFiles: boolean
  dropDepth: number
  inDropZone: boolean
  dropArea: 'preview' | 'dropzone'
  fileList: File[]
}

export type UploadAction =
  | {
      type: 'SET_DROP_DEPTH'
      value: UploadState['dropDepth']
    }
  | {
      type: 'SET_IN_DROP_ZONE'
      value: UploadState['inDropZone']
      dropArea: UploadState['dropArea']
    }
  | {
      type: 'ADD_FILE_TO_LIST'
      value: UploadState['fileList']
    }
  | {
      type: 'REMOVE_FILES'
    }
  | {
      type: 'SET_ERRORS'
      value: UploadState['errors']
    }

export const defaultSettings: Partial<DropzoneSettings> = {
  component: undefined,
  label: 'Add image',
  activeLabel: 'Drop file',
  showFileName: true,
  position: 'right',
  icon: <UploadIcon />,
  replaceWithPreview: false,
  overlay: false,
}

export const uploadReducer = (state: UploadState, action: UploadAction) => {
  switch (action.type) {
    case 'SET_DROP_DEPTH':
      return { ...state, dropDepth: action.value }
    case 'SET_IN_DROP_ZONE':
      return { ...state, inDropZone: action.value, dropArea: action.dropArea }
    case 'ADD_FILE_TO_LIST':
      return {
        ...state,
        errors: [],
        removeImage: false,
        fileList: state.multiFiles
          ? state.fileList.concat(action.value)
          : [...action.value],
      }
    case 'REMOVE_FILES':
      return { ...state, removeImage: true, fileList: [], errors: [] }
    case 'SET_ERRORS':
      return { ...state, errors: action.value }
    default:
      return state
  }
}
