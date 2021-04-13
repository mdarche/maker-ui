interface FormField {
  name: string
  id: string
  label: string
  placeholder: string
  type: 'text' | 'email' | 'datepicker' | 'toggle' | 'select' | 'repeater'
  datepickerSettings: object
}
