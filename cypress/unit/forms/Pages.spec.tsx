describe('FormPage', () => {
  it('accepts a custom title string', () => {})
  it('accepts a custom title component', () => {})
  it('accepts a custom title callback function', () => {})
  it('formats the page grid according to the column prop', () => {})
  it('formats the page grid according to the gap prop', () => {})
  it('validates only fields on its page', () => {})
})

describe('PageButton', () => {
  it('accepts a custom label string', () => {})
  it('accepts a custom label component', () => {})
  it('accepts a custom label callback function', () => {})
  it('is not active until page validation succeeds', () => {})
  it('navigates to the next form page on click', () => {})
  it('does nothing if placed on the last form page', () => {})
})

describe('BackButton', () => {
  it('accepts a custom label string', () => {})
  it('accepts a custom label component', () => {})
  it('accepts a custom label callback function', () => {})
  it('is not visible on single page forms', () => {})
  it('is not visible on the first page of multi-page forms', () => {})
  it('navigates to the previous form page on click', () => {})
})

describe('Progress', () => {
  it('renders the default progress element', () => {})
  it('updates in both directions when the form page changes', () => {})
})
