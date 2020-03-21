import React, { useContext, useState } from 'react'
import Helmet from 'react-helmet'

const SeoContext = React.createContext()
const SeoUpdateContext = React.createContext()

const SeoProvider = ({ defaults, children }) => {
  const [state, setState] = useState({
    title: defaults.title || '',
    description: defaults.description || '',
    siteUrl: '',
    image: undefined,
    twitter: '',
    lang: 'en',
  })

  return (
    <SeoContext.Provider value={state}>
      <SeoUpdateContext.Provider value={setState}>
        {children}
      </SeoUpdateContext.Provider>
    </SeoContext.Provider>
  )
}

export function useSeo() {
  const state = useContext(SeoContext)

  if (typeof state === undefined) {
    throw new Error('Seo component must be used within an SeoProvider')
  }

  return state
}

export function useSeoUpdater() {
  const setState = useContext(SeoUpdateContext)

  if (typeof state === undefined) {
    throw new Error('useSeoUpdater must be used within an SeoProvider')
  }

  return setState
}

const Seo = props => {
  const state = useSeo()

  const {
    title = state.title,
    description = state.description,
    image = state.image,
    lang = state.lang,
    twitter = state.twitter,
    meta = [],
  } = props

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]
        .concat(
          image
            ? [
                {
                  property: 'og:image',
                  content: image,
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image',
                },
              ]
            : [
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
              ]
        )
        .concat(meta)}
    />
  )
}

export { SeoProvider, useSeo, useSeoUpdater, Seo }
