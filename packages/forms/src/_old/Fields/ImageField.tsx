import React, { useEffect, useState } from 'react'
import { useField, useFormikContext } from 'formik'
import { ImagePicker } from '../../components/fields/ImagePicker'
import type { InputProps, FieldSettings } from '../types'

interface ImageFieldProps extends InputProps {
  settings: FieldSettings<'image-picker'>
}

export const ImageField = ({
  id,
  name,
  settings: { returnUrl, ...settings },
  hasError,
  cy,
  ...props
}: ImageFieldProps) => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState('')
  const { isSubmitting } = useFormikContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, { touched }, { setValue, setTouched }] = useField(name)

  async function setLocalUrl(url: Promise<string>) {
    const urlString = await url
    setImageUrl(urlString)
  }

  useEffect(() => {
    if (!touched && isSubmitting) {
      setTouched(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting])

  useEffect(() => {
    // Check if Local URL String is required, else just return file
    if (!!returnUrl) {
      setValue({ file: imageFile, url: imageUrl })
    } else {
      setValue(imageFile)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, imageUrl, name])

  return (
    <ImagePicker
      id={id || name}
      setFile={setImageFile}
      onUploadImage={setLocalUrl}
      {...settings}
      cy={cy}
    />
  )
}
