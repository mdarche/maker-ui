import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'

const SEOContext = React.createContext(null)
const SEOUpdateContext = React.createContext(null)

interface SEOProps {
  title: string
  titleTemplate?: string
  description?: string
  siteUrl?: string
  image?: string
  twitter?: string
  lang?: string
  noTemplate?: boolean
  meta?: any[]
}

interface SEOProviderProps {
  defaultSeo: SEOProps
  children: React.ReactNode
}

/**
 * The `SEOProvider` wraps your application's page content and supplies default
 * values to all nested `SEO` components.
 *
 * @see https://maker-ui.com/docs/components/seo
 */

const SEOProvider = ({
  defaultSeo: {
    title = '',
    titleTemplate = '',
    description = '',
    siteUrl = '',
    image,
    twitter = '',
    lang = 'en',
  },
  children,
}: SEOProviderProps) => {
  const [state, setState] = useState({
    title,
    titleTemplate,
    description,
    siteUrl,
    image,
    twitter,
    lang,
  })

  return (
    <SEOContext.Provider value={state}>
      <SEOUpdateContext.Provider value={setState}>
        {children}
      </SEOUpdateContext.Provider>
    </SEOContext.Provider>
  )
}

/**
 * You can use an `SEO` component anywhere in a page or post layout to inject
 * SEO tags into the document `<head>`. Powered by React Helmet.
 *
 * @see https://maker-ui.com/docs/components/seo
 */

const SEO = (props: SEOProps) => {
  const [state] = useSEO()

  const {
    title = state.title,
    description = state.description,
    image = state.image,
    lang = state.lang,
    twitter = state.twitter,
    titleTemplate = state.titleTemplate,
    siteUrl = state.siteUrl,
    noTemplate = false,
    meta = [],
  } = props

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={noTemplate ? title : `${title}${titleTemplate}`}
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
                  content: siteUrl + image,
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

function useSEO(): [any, any] {
  const state = useContext(SEOContext)
  const setState = useContext(SEOUpdateContext)

  if (typeof state === undefined) {
    throw new Error('SEO component must be used within an SEOProvider')
  }

  return [state, setState]
}

export { SEOProvider, SEO, useSEO }
