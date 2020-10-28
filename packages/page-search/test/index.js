import React from 'react'
import { render, fireEvent, wait, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

import PageSearch from '../src'

const renderJSON = e => renderer.create(e).toJSON()

jest.useFakeTimers()
afterEach(cleanup)

const demoText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis lorem nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const setup = () => {
  const utils = render(
    <>
      <PageSearch />
      <p>{demoText}</p>
    </>
  )
  const input = utils.getByPlaceholderText('Search this page...')
  return { input, ...utils }
}

test('PageSearch renders', () => {
  const json = renderJSON(<PageSearch />)
  expect(json).toMatchSnapshot()
})

test('PageSearch adds marks to document on search', () => {
  const { input } = setup()

  expect(input.value).toBe('')
  fireEvent.change(input, { target: { value: 'Lorem' } })
  expect(input.value).toBe('Lorem')

  wait(
    () => {
      expect(document.querySelectorAll('.search-mark').length).toBe(2)
    },
    { timeout: 1000 }
  )
})
