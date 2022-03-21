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
  firstTouch,
  setFirstTouch,
  cy,
  ...props
}: ImageFieldProps) => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, { setValue }] = useField({
    ...props,
    name,
    type: 'image-picker',
  })

  useEffect(() => {
    setValue(imageFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, name])

  return (
    <ImagePicker id={id || name} setFile={setImageFile} {...settings} cy={cy} />
  )
}
