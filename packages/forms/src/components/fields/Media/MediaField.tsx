import React, { useEffect, useState } from 'react'
import { merge } from '@maker-ui/utils'

import { useField, useForm } from '@/hooks'
import type { FieldInputProps } from '@/types'
import { ImagePicker } from './ImagePicker'

export const MediaField = ({ name }: FieldInputProps) => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState('')
  const { isSubmitting } = useForm()
  const { field, value, touched, setTouched, setValue } = useField(name)
  // Map field props into component props where applicable
  const val =
    value && typeof value === 'object'
      ? value?.url
      : value && typeof value === 'string'
      ? value
      : undefined
  const props = merge(
    {
      preview: val ?? field?.image?.preview,
      inputProps: { ...(field?.inputProps || {}), id: `field-${name}` },
    },
    field?.image || {}
  )

  async function setLocalUrl(url: Promise<string>) {
    const urlString = await url
    setImageUrl(urlString)
  }

  useEffect(() => {
    if (!touched && isSubmitting) {
      setTouched()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting])

  useEffect(() => {
    setValue({ file: imageFile, url: imageUrl })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, imageUrl, name])

  return (
    <ImagePicker
      setFile={setImageFile}
      onUploadImage={setLocalUrl}
      {...props}
    />
  )
}
