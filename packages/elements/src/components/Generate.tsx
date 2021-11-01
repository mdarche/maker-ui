import * as React from 'react'

import { shuffle } from './helper'

interface GenerateProps {
  data: Object[] | React.ReactElement[]
  count?: number
  children?: React.ReactElement
}

/**
 * The `Generate` component lets you configure a template component with props from
 * a randomly shuffled array of properties or shuffle an array of React components.
 *
 * @link https://maker-ui.com/docs/elements/generate
 */

export const Generate = ({ data, count, children }: GenerateProps) => {
  const [random, setRandom] = React.useState<GenerateProps['data'][]>([])

  React.useEffect(() => {
    setRandom(shuffle(data))
  }, [data, setRandom])

  /**
   * If there is no template component but the data array itself is composed of
   * React components, shuffle them and return
   */
  if (!children && React.isValidElement(data[0])) {
    return (
      <React.Fragment>
        {count
          ? random
              .slice(0, count)
              .map((item, index) => (
                <React.Fragment key={index}>{item}</React.Fragment>
              ))
          : random.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
      </React.Fragment>
    )
  }

  /**
   * If a child template exists, return the required count (or all) and assign each
   * element the corresponding props from the `data` array.
   */
  if (children) {
    return (
      <React.Fragment>
        {count
          ? random
              .slice(0, count)
              .map((item, index) => (
                <React.Fragment key={index}>
                  {React.cloneElement(children, item)}
                </React.Fragment>
              ))
          : random.map((item, index) => (
              <React.Fragment key={index}>
                {React.cloneElement(children, item)}
              </React.Fragment>
            ))}
      </React.Fragment>
    )
  }

  /**
   * Else return null
   */
  return null
}
