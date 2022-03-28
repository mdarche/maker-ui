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
      name: 'columns',
      label: 'columns',
      type: 'number',
      initialValue: settings.columns,
      colSpan: 1,
    },
    {
      name: 'gap',
      label: 'gap',
      type: 'number',
      initialValue: settings.gap,
      colSpan: 1,
    },
    // {
    //   name: 'submitFormOnBlur',
    //   label: 'validateFieldOnBlur',
    //   type: 'switch',
    //   initialValue: settings.validateFieldOnBlur,
    // },
    {
      name: 'validateFieldOnBlur',
      label: 'validateFieldOnBlur',
      type: 'switch',
      initialValue: settings.validateFieldOnBlur,
    },
    {
      name: 'validateFormOnChange',
      label: 'validateFormOnChange',
      type: 'switch',
      initialValue: settings.validateFormOnChange,
    },
    {
      name: 'validateFormOnBlur',
      label: 'validateFormOnBlur',
      type: 'switch',
      initialValue: settings.validateFormOnBlur,
    },
    {
      name: 'disableSubmit',
      label: 'disableSubmit',
      type: 'switch',
      initialValue: settings.disableSubmit,
    },
    {
      name: 'autoSave',
      label: 'autoSave',
      type: 'switch',
      initialValue: settings.autoSave,
    },
    {
      name: 'labelStyle',
      label: 'labelStyle',
      type: 'select',
      initialValue: settings.labelStyle,
      settings: {
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
      colSpan: 1,
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
