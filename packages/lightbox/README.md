# @maker-ui/lightbox

A lightbox component for showing individual media or an array of image and video data. Supports Youtube, Vimeo, HTML5 video, and images.

Lightbox is fully customizable with Theme UI variants.

## Installation

```
npm i @maker-ui/lightbox
```

## Usage

The lightbox component is built on top of `@maker-ui`'s Modal and shares a very similar API. By default it will append to the end of your document's body tag or you can specify a different DOM node by id selector.

To trigger the lightbox, either supply an external toggle or add nested `Lightbox.Link` components as children.

### External Trigger Approach

You can open a lightbox component programatically when you supply the `show` and `toggle` props. For example, you might create a new button click event as shown below:

```js
import React, { useState } from 'react'
import Lightbox from '@maker-ui/lightbox'

import media = [
  {src: './image1.jpg', title: 'Image 1' },
  {src: './image2.jpg', title: 'Image 2' }
  {src: './image3.jpg', title: 'Image 3' }
]

const PageComponent = () => {
  const [show, set] = useState(false)

  const openToggle = e => set(true)

  return (
    <div>
      <h1>Page Title</h1>
      <button onClick={openToggle}>Open Lightbox</button>
      <Lightbox show={show} toggle={set} data={media} />
    </div>
  )
}
```

### Lightbox.Link Approach

Lightbox also supplies its own toggle with `Lightbox.Link` subcomponents. This approach is ideal if you want to render a media grid where clicking on an item opens a lightbox gallery.

You can wrap `Lightbox.Link` around any component-- just remember to supply the necessary media props (see below).

```js
import React, { useState } from 'react'
import Lightbox from '@maker-ui/lightbox'

import media = [
  {src: './image1.jpg', title: 'Image 1' },
  {src: './image2.jpg', title: 'Image 2' }
  {src: './image3.jpg', title: 'Image 3' }
]

const PageComponent = () => (
  <div>
    <Lightbox>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {media.map(({src, title}) => (
          <Lightbox.Link key={title} src={src} title={title}>
            <img src={src} alt={title}/>
          </Lightbox.Link>)
        )}
      </div>
    </Lightbox>
  </div>
)
```

Note: Lightbox identifies `Lightbox.Link` components to generate data for the modal, but you can nest any type of children inside Lightbox for custom layouts and structure.

## Media Types

## Props

## Variants and Selectors

By default, each component of are nested under the lightbox variant. You can supply your own custom variant and all
