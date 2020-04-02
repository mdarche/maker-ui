# @maker-ui/components

## Modal README

An accessible dialog component that uses React's Portal API to render a custom component at the document root.

## Installation

```
npm i @maker-ui/modal
```

## Usage

Using the Modal requires 2 steps:

First, add a div with a unique ID to the document root. You can do this in your app's template HTML file, or if you are using an SSR framework like Gatsby, you can create this root element at build time with the SSR API.

Just make sure you add your portal div to a DOM node that sits above your layout, thus ensuring no `z-index` conflicts.

Next, all you have to do is import the <Modal /> component in your project and wrap it around your custom component. You can activate and deactivate the modal component by supplying a `toggle` prop:

_HTML Template_

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

_Your component:_

```js
import React, { useState } from 'react'
import { Modal } from '@maker-ui/modal'

const CustomModal = () => {
  const [show, set] = useState(false)

  return (
    <div>
      <button onClick={e => set(!show)}>Toggle Modal</button>
      <Modal root="modal-root" toggle={show}>
        <div>Hello!</div>
      </Modal>
    </div>
  )
}
```

## Event Bubbling

Because the Modal component uses React's Portal API, it can still utilize all styles, variants, and properties of your Theme UI or Maker UI theme.

## Focus Management

## Usage with Gatsby

To use the Modal with Gatsby,
