/// <reference types="jest" />
import * as React from 'react'
import { sortChildren } from '../src/helpers'

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  _type?: string
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  _type?: string
}

export const Div = (props: DivProps) => <div {...props} />
export const Button = (props: ButtonProps) => <button {...props} />

describe('sortChildren function', () => {
  it('should separate React children elements into distinct slots based on the `_type` prop', () => {
    const submitButton = <Button _type="submit">Submit</Button>
    const errorMessage = <Div _type="error">Error message</Div>
    const successMessage = <Div _type="success">Success message</Div>
    const header = <Div _type="header">Header</Div>
    const footer = <Div _type="footer">Footer</Div>
    const progress = <Div _type="progress">Progress bar</Div>
    // const children = [<div key={1}>Child 1</div>, <div key={2}>Child 2</div>]

    const slots = sortChildren(
      <>
        {submitButton}
        {errorMessage}
        {successMessage}
        {header}
        {footer}
        {progress}
        {/* {children} */}
      </>
    )

    // expect(slots.submit).toEqual(submitButton)
    // expect(slots.error).toEqual(errorMessage)
    // expect(slots.success).toEqual(successMessage)
    // expect(slots.header).toEqual(header)
    // expect(slots.footer).toEqual(footer)
    // expect(slots.progress).toEqual(progress)
    // expect(slots.children).toEqual(children)
  })
})
