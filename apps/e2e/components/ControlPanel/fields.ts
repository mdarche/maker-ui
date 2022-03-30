import { type FieldProps, Yup, type FormSettings } from '@maker-ui/forms'

export const defaultFormProps: Partial<FormSettings> = {
  columns: 2,
  gap: 30,
  pages: 1,
  pageTransition: 'none',
  placeholderColor: '#b7b7b7',
  labelStyle: 'top-left',
  errorStyle: 'bottom-right',
  validateFormOnChange: false,
  validateFormOnBlur: true,
  validateFieldOnBlur: true,
  disableSubmit: false,
  autoSave: false,
}

export const getFields = (settings: Partial<FormSettings>): FieldProps[] => {
  return [
    {
      name: 'divider',
      label: 'Form Layout',
      type: 'divider',
    },
    {
      name: 'columns',
      label: 'Columns',
      description: 'columns',
      type: 'number',
      initialValue: settings.columns,
      colSpan: 1,
    },
    {
      name: 'gap',
      label: 'Gap',
      description: 'gap',
      type: 'number',
      initialValue: settings.gap,
      colSpan: 1,
    },
    {
      name: 'labelStyle',
      label: 'labelStyle',
      type: 'select',
      initialValue: settings.labelStyle,
      settings: {
        isMulti: true,
        options: [
          { label: 'Top Right', value: 'top-right' },
          { label: 'Top Left', value: 'top-left' },
          { label: 'Top Center', value: 'top-center' },
          { label: 'Bottom Right', value: 'bottom-right' },
          { label: 'Bottom Left', value: 'bottom-left' },
          { label: 'Bottom Center', value: 'bottom-center' },
          { label: 'Right', value: 'right' },
          { label: 'Left', value: 'left' },
          { label: 'Floating', value: 'floating' },
        ],
      },
    },
    // {
    //   name: 'submitFormOnBlur',
    //   label: 'validateFieldOnBlur',
    //   type: 'switch',
    //   initialValue: settings.validateFieldOnBlur,
    // },
    {
      name: 'divider',
      label: 'Validation',
      type: 'divider',
    },
    {
      name: 'validateFieldOnBlur',
      label: 'Validate Field - Blur',
      description: 'validateFieldOnBlur',
      type: 'switch',
      initialValue: settings.validateFieldOnBlur,
      settings: {
        style: 'circle',
      },
    },
    {
      name: 'validateFormOnChange',
      label: 'Validate Form - Input Change',
      description: 'validateFormOnChange',
      type: 'switch',
      initialValue: settings.validateFormOnChange,
      settings: {
        style: 'circle',
      },
    },
    {
      name: 'validateFormOnBlur',
      label: 'Validate Form - Blur',
      description: 'validateFormOnBlur',
      type: 'switch',
      initialValue: settings.validateFormOnBlur,
      settings: {
        style: 'circle',
      },
    },
    {
      name: 'disableSubmit',
      label: 'Disable Submit Button',
      description: 'disableSubmit',
      type: 'switch',
      initialValue: settings.disableSubmit,
      settings: {
        style: 'circle',
      },
    },
    {
      name: 'autoSave',
      label: 'autoSave',
      type: 'switch',
      initialValue: settings.autoSave,
      settings: {
        style: 'circle',
      },
    },

    // {
    //   name: 'errorStyle',
    //   label: 'errorStyle',
    //   type: 'select',
    //   initialValue: settings.errorStyle,
    //   colSpan: 1,
    // },
    // {
    //   name: 'placeholderColor',
    //   label: 'placeholderColor',
    //   type: 'color',
    //   initialValue: settings.placeholderColor,
    //   colSpan: 1,
    // },
  ]
}
