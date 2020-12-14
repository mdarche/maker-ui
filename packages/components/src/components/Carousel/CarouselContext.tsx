import * as React from 'react'
import merge from 'deepmerge'

import { CarouselProps } from './Carousel'

const defaults: CarouselState['settings'] = {
  showNav: true,
  pageIndicator: false,
  progressBar: false,
  barReverse: false,
  pauseOnHover: false,
  hideControls: false,
  showControlsOnHover: false,
  duration: 6500,
  transition: 'slide',
  springConfig: { mass: 1, tension: 160, friction: 28 },
}

const CarouselDataContext = React.createContext(null)
const CarouselUpdateContext = React.createContext(null)

interface CarouselContextProps extends CarouselProps {
  children: React.ReactNode
}

export interface CarouselState extends CarouselProps {
  index?: number
  count?: number
  nextSlide?: boolean
}

const CarouselContext = ({
  data = [],
  settings,
  variant,
  children,
}: CarouselContextProps) => {
  const [state, setState] = React.useState({
    variant,
    settings: merge(defaults, settings),
  })
  return (
    <CarouselDataContext.Provider value={state}>
      <CarouselUpdateContext.Provider value={setState}>
        {children}
      </CarouselUpdateContext.Provider>
    </CarouselDataContext.Provider>
  )
}

export { CarouselContext }
