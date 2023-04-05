/// <reference types="jest" />
import * as React from 'react'
import { cleanup, render } from '@testing-library/react'
import DOMPurify from 'dompurify'
import { sanitizeAndRender } from '../src/utils/sanitize'

jest.mock('dompurify')

afterEach(cleanup)

describe('sanitizeAndRender', () => {
  const inputHtml = '<p>Some <b>bold</b> text</p>'
  const expectedOutput: React.ReactNode = (
    <React.Fragment>
      &lt;p&gt;Some &lt;b&gt;bold&lt;/b&gt; text&lt;/p&gt;
    </React.Fragment>
  )

  beforeEach(() => {
    ;(DOMPurify.sanitize as jest.Mock).mockReturnValue(inputHtml)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it.only('should sanitize and render an HTML string', () => {
    const input = '<p>Some <b>bold</b> text</p>'
    const expected = (
      <React.Fragment>
        <p>
          Some <b>bold</b> text
        </p>
      </React.Fragment>
    )
    const output = sanitizeAndRender(input)
    expect(output).toEqual(expected)
  })

  it('should sanitize and render JSX', () => {
    const jsx = (
      <p>
        Some <b>bold</b> text
      </p>
    )
    const output = sanitizeAndRender(jsx)
    expect(output).toEqual(expectedOutput)
  })

  it('should sanitize and render a string of JSX', () => {
    const jsxString = '<p>Some <b>bold</b> text</p>'
    const output = sanitizeAndRender(jsxString)
    expect(output).toEqual(expectedOutput)
  })

  it('should sanitize and render a string of text', () => {
    const text = 'Some bold text'
    const output = sanitizeAndRender(text)
    expect(output).toEqual(text)
  })
})
