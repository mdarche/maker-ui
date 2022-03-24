import React, { useEffect, useState } from 'react'
import { useField, useFormikContext } from 'formik'
import { ImagePicker } from '../ImagePicker'
import type { InputProps, FieldSettings } from '../types'

interface ImageFieldProps extends InputProps {
  settings: FieldSettings<'image-picker'>
}

export const ImageField = ({
  id,
  name,
  settings,
  hasError,
  cy,
  ...props
}: ImageFieldProps) => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const { isSubmitting } = useFormikContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, { touched }, { setValue, setTouched }] = useField({
    ...props,
    name,
    type: 'file',
  })

  useEffect(() => {
    if (!touched && isSubmitting) {
      setTouched(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting])

  useEffect(() => {
    setValue(imageFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, name])

  return (
    <ImagePicker id={id || name} setFile={setImageFile} {...settings} cy={cy} />
  )
}
