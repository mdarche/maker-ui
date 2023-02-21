import React, { useRef } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useKeyboardShortcut } from '../src/useKeyboardShortcut'

const MockComponent = ({
  shortcuts,
}: {
  shortcuts: Parameters<typeof useKeyboardShortcut>[0]
}) => {
  const ref = useRef(null)
  useKeyboardShortcut(shortcuts, ref)

  return (
    <div tabIndex={0} ref={ref}>
      Mock Component
    </div>
  )
}

describe('useKeyboardShortcut', () => {
  it('should trigger callback when a matching keyboard shortcut is pressed', () => {
    const callback = jest.fn()
    const shortcuts = [{ key: 'KeyA', callback }]
    render(<MockComponent shortcuts={shortcuts} />)
    fireEvent.keyDown(document, { code: 'KeyA' })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should not trigger callback when a non-matching keyboard shortcut is pressed', () => {
    const callback = jest.fn()
    const shortcuts = [{ key: 'KeyA', callback }]
    const { container } = render(<MockComponent shortcuts={shortcuts} />)
    fireEvent.keyDown(container, { code: 'KeyB' })
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('should not trigger callback when modifier keys do not match', () => {
    const callback = jest.fn()
    const shortcuts = [{ key: 'KeyA', shiftKey: true, callback }]
    const { container } = render(<MockComponent shortcuts={shortcuts} />)
    fireEvent.keyDown(container, { code: 'KeyA', shiftKey: false })
    expect(callback).toHaveBeenCalledTimes(0)
  })

  // it('should trigger callback when modifier keys match', () => {
  //   const callback = jest.fn()
  //   const shortcuts = [{ key: 'KeyA', shiftKey: true, callback }]
  //   const { container } = render(<MockComponent shortcuts={shortcuts} />)
  //   fireEvent.keyDown(container, { code: 'KeyA', shiftKey: true })
  //   expect(callback).toHaveBeenCalledTimes(1)
  // })

  // it('should listen to keydown events on the ref element if provided', () => {
  //   const callback = jest.fn()
  //   const ref = { current: document.createElement('div') }
  //   const shortcuts = [{ key: 'KeyA', callback }]
  //   render(<MockComponent shortcuts={shortcuts} ref={ref} />)
  //   fireEvent.keyDown(ref.current, { code: 'KeyA' })
  //   expect(callback).toHaveBeenCalledTimes(1)
  // })
})
