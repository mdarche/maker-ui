import { Form, type FormSettings } from '@maker-ui/forms'
import { Div, merge } from 'maker-ui'
import { useState } from 'react'
import { getFields } from './fields'

const defaults = {
  columns: 1,
  gap: 30,
  pages: 1,
  pageTransition: 'none',
  placeholderColor: '#b7b7b7',
  labelStyle: { label: 'Top Left', value: 'top-left' },
  errorStyle: 'bottom-right',
  validateFormOnChange: false,
  validateFormOnBlur: true,
  validateFieldOnBlur: true,
  disableSubmit: false,
  autoSave: false,
}

interface ControlPanelProps {
  sendProps: (b: FormSettings) => void
}

export const ControlPanel = ({ sendProps }: ControlPanelProps) => {
  const [formSettings, setFormSettings] = useState<Partial<FormSettings>>(
    // @ts-ignore
    defaults
  )
  const fields = getFields(formSettings)

  function onSubmit(vals: any, setSubmitting: (b: boolean) => void) {
    let v = vals
    //@ts-ignore
    v['labelStyle'] =
      vals.labelStyle === undefined
        ? formSettings.labelStyle?.value
        : v.labelStyle.value
    console.log('v is', v)
    setSubmitting(false)
    sendProps(v)
    setFormSettings(merge(formSettings, v))
  }

  // console.log('FormSettings', formSettings)

  return (
    <Div>
      <Form.Provider
        fields={fields}
        settings={{ columns: '1fr', autoSave: true }}
        onSubmit={(vals, { setSubmitting }) => {
          onSubmit(vals, setSubmitting)
        }}>
        <Form>
          <Form.Error />
          <Form.Success />
        </Form>
      </Form.Provider>
    </Div>
  )
}
