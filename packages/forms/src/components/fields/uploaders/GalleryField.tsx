import React, { useEffect, useState } from 'react'
import { merge } from '@maker-ui/utils'

import { FieldInputProps } from '@/types'
import { GalleryPicker } from './GalleryPicker'

export const GalleryField = ({ name }: FieldInputProps) => {
  return <GalleryPicker />
}
