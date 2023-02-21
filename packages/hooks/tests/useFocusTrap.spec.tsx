import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { useFocusTrap } from '../src/useFocusTrap'

const MockComponent = ({ active = true }: { active?: boolean }) => {
  const ref = React.useRef(null)
  useFocusTrap(ref)

  return (
    <div ref={ref} data-testid="container">
      <button data-testid="first">First</button>
      <button data-testid="second">Second</button>
      <a data-testid="third" href="/">
        Third
      </a>
      <button data-testid="last">Last</button>
    </div>
  )
}

test('focus stays within the container', async () => {
  const { getByTestId, container } = render(<MockComponent />)
  // fireEvent.keyDown(document.body, { key: 'Tab', code: 'Tab' })
  // console.log('Active 1', document.activeElement)
  // fireEvent.keyDown(document.body, { key: 'Tab', code: 'Tab' })
  // console.log('Active 2', document.activeElement)
  // fireEvent.keyDown(document.body, { key: 'Tab', code: 'Tab' })
  // console.log('Active 3', document.activeElement)
  // fireEvent.keyDown(document.body, { key: 'Tab', code: 'Tab' })
  // console.log('Active 4', document.activeElement)

  // waitFor(() => {
  //   expect(container).to
  // })

  fireEvent.keyDown(container, { code: 'Tab' })
  expect(document.activeElement).toEqual(getByTestId('first'))

  fireEvent.keyDown(document, { code: 'Tab', shiftKey: true })
  expect(document.activeElement).toEqual(getByTestId('last'))

  fireEvent.keyDown(document, { code: 'Tab', shiftKey: true })
  expect(document.activeElement).toEqual(getByTestId('third'))

  fireEvent.keyDown(document, { code: 'Tab' })
  expect(document.activeElement).toEqual(getByTestId('last'))
})

// test('focus trap is inactive when `active` is false', () => {
//   const { getByTestId } = render(
//     <div data-testid="container">
//       <input data-testid="first" />
//       <button data-testid="second">Second</button>
//       <a data-testid="third" href="#">
//         Third
//       </a>
//       <button data-testid="last">Last</button>
//     </div>
//   )

//   const containerRef = useRef<HTMLElement>(getByTestId('container'))
//   const { first, last } = useFocusTrap(containerRef, false)

//   fireEvent.keyDown(document, { key: 'Tab' })
//   expect(document.activeElement).toEqual(getByTestId('first'))

//   fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
//   expect(document.activeElement).toEqual(getByTestId('last'))

//   fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
//   expect(document.activeElement).toEqual(getByTestId('third'))

//   fireEvent.keyDown(document, { key: 'Tab' })
//   expect(document.activeElement).toEqual(getByTestId('last'))
// })

// test('exitCallback is called when focus leaves the container', () => {
//   const exitCallback = jest.fn()

//   const { getByTestId } = render(
//     <>
//       <input data-testid="outside-input" />
//       <div data-testid="container">
//         <input data-testid="first" />
//         <button data-testid="second">Second</button>
//         <a data-testid="third" href="#">
//           Third
//         </a>
//         <button data-testid="last">Last</button>
//       </div>
//     </>
//   )

//   const containerRef = useRef<HTMLElement>(getByTestId('container'))
//   useFocusTrap(containerRef, true, exitCallback)

//   fireEvent.keyDown(document, { key: 'Tab' })
//   expect(document.activeElement).toEqual(getByTestId('first'))

//   fireEvent.focus(getByTestId('outside-input'))

//   expect(exitCallback).toHaveBeenCalledTimes(1)
// })
