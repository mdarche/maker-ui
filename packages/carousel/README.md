# @elements-ui/carousel

An accessible carousel component built with [react-spring](https://www.react-spring.io/)
that works seamlessly with a Theme UI theme provider or an Elements UI layout.

## Installation

```
npm i @elements-ui/carousel
```

## Usage

Carousel does not make any assumptions about the data you want to cycle through (text, photos, videos, etc.). Simply build your own custom template component and iterate over an array of data.

You can style your carousel with the `sx` prop as well as variants or classNames (see below).

```js
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import Carousel from '@elements-ui/carousel'

import theme from './theme'

const slideData = [
  { message: 'hi', class: '1' },
  { message: 'hiya', class: '2' },
  { message: 'hello', class: '3' },
]

const Slide = ({ message, class }) => <div className={class}>{message}</div>

export default () => (
  <ThemeProvider theme={theme}>
    <Carousel
      data={slideData}
      template={<Slide />}
      autoPlay
      duration={4500}
      transition="fade"
    />
  </ThemeProvider>
)
```

## Props

| Props             |       Type        |     Default     | Description                                                                                                                                                        |
| ----------------- | :---------------: | :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **data**          |      _array_      |  [](required)   | an array of objects to iterate over.                                                                                                                               |
| **template**      | _React component_ | null (required) | a custom component that Carousel uses to create its slides. Each property of your data object should correspond with a prop in your custom component.              |
| **autoPlay**      |      _bool_       |      false      | when set to true, Carousel will automatically cycle through slides based on the `duration` prop                                                                    |
| **duration**      |     _number_      |      5000       | the duration in milliseconds that a slide will be visible. 5000 = 5 seconds                                                                                        |
| **nav**           |      _bool_       |      true       | shows / hides accessible slide navigation (previous / next arrow buttons). You can customize these buttons with the `arrow` prop.                                  |
| **pageIndicator** |      _bool_       |      false      | shows / hides a current slide indicator                                                                                                                            |
| **transition**    |     _string_      |     "slide"     | determines the slide enter / exit transition. Current options: `"fade"`, `"fade-up"`, `"fade-down"`, `"slide"`                                                     |
| **hoverPause**    |      _bool_       |      false      | pauses the carousel's `autoPlay` feature onMouseEnter and resumes onMouseLeave.                                                                                    |
| **pause**         |      _bool_       |      false      | Pauses the carousel's `autoPlay` feature. Helpful for designing slides in development or using with a custom control.                                              |
| **arrow**         | _React component_ |      null       | overrides the default arrow icon for slide navigation. Submit a right facing arrow component for `next` and the Carousel will rotate it 180 degrees for `previous` |
| **variant**       |     _string_      |   "carousel"    | a custom Theme UI variant for styling. Recommended: use the default `carousel` variant.                                                                            |

## Styling

Carousel supports both Theme UI variants as well as CSS selectors so you can customize the appearance of your design in any way.

| Component                  | Default variant       | Default className                                  |
| -------------------------- | :-------------------- | :------------------------------------------------- |
| **Carousel** (container)   | `carousel`            | `carousel`                                         |
| **Pagination** (container) | `carousel.pagination` | `carousel-pagination`                              |
| **Page Indicator**         | `carousel.page`       | `carousel-page` (with `active` when current index) |
| **Next Button**            | `carousel.next`       | `carousel-next`                                    |
| **Prev Button**            | `carousel.prev`       | `carousel-prev`                                    |
