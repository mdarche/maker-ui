import React, {
  useState,
  useEffect,
  isValidElement,
  cloneElement,
  Fragment,
} from 'react'

import { shuffle } from './utils'

interface GenerateProps {
  /** An array of prop objects that will be applied to the child template, or an array of
   * React components that will be shuffled at runtime.
   */
  data: Object[] | React.ReactElement[]
  /** The total number of components that the function should generate if the desired count
   * is less than the length of the `data` prop array.
   */
  count?: number
  /** An optional React element that will be used as a generative component template.
   * It should support all props outlined in the `data` prop. */
  children?: React.ReactElement
}

/**
 * The `Generate` component lets you configure a template component with props from
 * a randomly shuffled array of properties or shuffle an array of React components.
 *
 * @link https://maker-ui.com/docs/elements/generate
 */
export const Generate = ({ data, count, children }: GenerateProps) => {
  const [random, setRandom] = useState<GenerateProps['data'][]>([])

  useEffect(() => {
    setRandom(shuffle(data))
  }, [data, setRandom])

  // If there is no template component but the data array itself is composed of
  // React components, shuffle them and return

  if (!children && isValidElement(data[0])) {
    return (
      <>
        {count
          ? random
              .slice(0, count)
              .map((item, index) => <Fragment key={index}>{item}</Fragment>)
          : random.map((item, index) => (
              <Fragment key={index}>{item}</Fragment>
            ))}
      </>
    )
  }

  // If a child template exists, return the required count (or all) and assign each
  // element the corresponding props from the `data` array.

  if (children) {
    return (
      <>
        {count
          ? random
              .slice(0, count)
              .map((item, index) => (
                <Fragment key={index}>{cloneElement(children, item)}</Fragment>
              ))
          : random.map((item, index) => (
              <Fragment key={index}>{cloneElement(children, item)}</Fragment>
            ))}
      </>
    )
  }

  // Else return null
  return null
}
