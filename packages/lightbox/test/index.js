import React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

import Lightbox from '../src/Lightbox'

const renderJSON = e => renderer.create(e).toJSON()

/* Describe Lightbox */

describe('Lightbox', () => {
  test('renders', () => {
    const json = renderJSON(<Lightbox />)
    expect(json).toMatchSnapshot()
  })

  test('renders from data array', () => {
    const json = renderJSON(
      <Lightbox>
        <Lightbox.Item trigger></Lightbox.Item>
      </Lightbox>
    )
    expect(json).toMatchSnapshot()
  })
})

// 1 - Renders

// 2 - Renders from data array

// 3 - Navigation works (keyboard and arrows)

// 4 - Autoplay disables on video

// 6 - Renders Youtube video

// 7 - Renders Vimeo video

// 8 - Hides group controls for single lightbox item (arrows, preview button, etc.)

/* Describe Lightbox Item */

describe('LightboxItem', () => {})

// 1 - Renders
