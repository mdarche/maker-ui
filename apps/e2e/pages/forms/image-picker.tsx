import { Section } from 'maker-ui'
import { ImagePicker } from '@maker-ui/forms'
import { useState } from 'react'

export default function ImagePickerPage() {
  const [file, setFile] = useState<File | undefined>(undefined)

  // Need to return processed file url
  console.log('File is', file)
  return (
    <Section css={{ padding: '50px 20px' }}>
      <ImagePicker
        setFile={setFile}
        removeImageComponent={<strong>Remove</strong>}
      />
    </Section>
  )
}
