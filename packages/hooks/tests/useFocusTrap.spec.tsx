import * as React from 'react'
import { render, fireEvent, renderHook } from '@testing-library/react'
import { useFocusTrap } from '../src/useFocusTrap'

test('focus stays within the container', async () => {
  let ref = React.createRef<any>()
  const { getByTestId } = render(
    <div data-testid="container">
      <input data-testid="first" />
      <button data-testid="second">Second</button>
      <a data-testid="third" href="#">
        Third
      </a>
      <button data-testid="last">Last</button>
    </div>
  )
  //@ts-ignore
  document?.activeElement?.blur()
  const container = getByTestId('container')
  //@ts-ignore
  ref.current = container
  // const { result } = renderHook(() => useFocusTrap(ref, true))
  // console.log('First is', result)
  fireEvent.keyDown(container, { code: 'Tab' })
  console.log('Active 1', document.activeElement)
  fireEvent.keyDown(container, { code: 'Tab' })
  console.log('Active 2', document.activeElement)
  fireEvent.keyDown(container, { code: 'Tab' })
  console.log('Active 3', document.activeElement)
  fireEvent.keyDown(container, { code: 'Tab' })
  console.log('Active 4', document.activeElement)

  // expect(document.activeElement).toEqual(result.current.first)

  // fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
  // expect(document.activeElement).toEqual(result.current.last)

  // fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
  // expect(document.activeElement).toEqual(getByTestId('third'))

  // fireEvent.keyDown(document, { key: 'Tab' })
  // expect(document.activeElement).toEqual(getByTestId('last'))
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
