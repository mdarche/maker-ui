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
  sendProps?: (b: FormSettings) => void
}

export const ControlPanel = ({ sendProps }: ControlPanelProps) => {
  const [formSettings, setFormSettings] = useState<Partial<FormSettings>>(
    // @ts-ignore
    defaults
  )
  const fields = getFields(formSettings)

  function onSubmit(vals: any, setSubmitting: (b: boolean) => void) {
    let v = vals
    // //@ts-ignore
    // v['labelStyle'] =
    //   vals.labelStyle === undefined
    //     ? formSettings.labelStyle?.value
    //     : v.labelStyle.value
    console.log('v is', v)
    setSubmitting(false)
    // sendProps(v)
    setFormSettings(merge(formSettings, v))
  }

  // console.log('FormSettings', formSettings)

  return (
    <Div>
      <Form.Provider
        key={'mike'}
        fields={fields}
        settings={{ columns: 2, gap: 20, autoSave: true }}
        onSubmit={(vals, { setSubmitting }) => {
          onSubmit(vals, setSubmitting)
        }}>
        <Form
          key={2}
          css={{
            // Select Field
            '.maker-ui__menu': {
              background: 'var(--color-background)',
              border: '1px solid var(--color-input_border)',
              zIndex: 10,
            },
            '.maker-ui__control': {
              transition: 'none',
              svg: {
                cursor: 'pointer',
              },
            },
            '.maker-ui__option': {
              cursor: 'pointer',
            },
            '.maker-ui__single-value': {
              color: 'var(--color-text)',
              cursor: 'pointer',
            },
            '.maker-ui__multi-value': {
              background: 'var(--color-input_disabled)',
              cursor: 'pointer',
              padding: '5px 0',
            },
            '.maker-ui__multi-value__label': {
              color: 'var(--color-text)',
            },
            '.maker-ui__option--is-selected': {
              color: 'var(--color-text)',
              background: 'var(--color-input_active)',
            },
            '.maker-ui__option--is-focused': {
              background: 'var(--color-input_active)',
            },
            '.maker-ui__option--is-disabled': {
              background: 'var(--color-input_disabled)',
            },
            '.maker-ui__control, input, textarea': {
              borderRadius: 2,
              color: 'var(--color-text)',
              background: 'var(--color-input)',
              border: '1px solid',
              borderColor: 'var(--color-border)',
            },
            '.maker-ui__indicator-separator': {
              backgroundColor: 'var(--color-border)',
            },
            '.maker-ui__input-container': { cursor: 'pointer' },
            // Labels
            '.field-description': {
              margin: '-5px 0 10px',
              fontFamily: 'var(--font-monospace)',
              fontSize: 12,
            },
            '.field-label': {
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 10,
            },
            // Inputs
            input: {
              padding: 10,
              marginBottom: 10,
              height: 40,
              fontSize: 15,
            },
            // Divider
            '.divider': {
              borderBottom: '1px solid var(--color-border)',
              padding: '20px 0 10px',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            },
          }}>
          {/* <Form.Header></Form.Header>
          <Form.Footer></Form.Footer> */}
        </Form>
      </Form.Provider>
    </Div>
  )
}
