import * as React from 'react'
import { Helmet } from 'react-helmet'

interface SEOProps {
  title?: string
  titleTemplate?: string
  description?: string
  siteUrl?: string
  image?: string
  twitter?: string
  lang?: string
  noTemplate?: boolean
  meta?: any[]
}

type SEOContextType = {
  state?: SEOProps
  setState?: (s: SEOProps) => void
}

interface SEOProviderProps {
  default: Partial<SEOProps>
  children: React.ReactNode
}

const SEOContext = React.createContext<SEOContextType>({
  state: {
    title: '',
    titleTemplate: '',
    description: '',
    siteUrl: '',
    twitter: '',
    lang: 'en',
  },
})

/**
 * The `SEOProvider` wraps your application's page content and supplies default
 * values to all nested `SEO` components.
 *
 * @link https://maker-ui.com/docs/components/seo
 */

const SEOProvider = (props: SEOProviderProps) => {
  const [state, setState] = React.useState<SEOProps>(props.default)

  return (
    <SEOContext.Provider value={{ state, setState }}>
      {props.children}
    </SEOContext.Provider>
  )
}

/**
 * You can use an `SEO` component anywhere in a page or post layout to inject
 * SEO tags into the document `<head>`. Powered by React Helmet.
 *
 * @link https://maker-ui.com/docs/components/seo
 */

const SEO = (props: SEOProps) => {
  const { state } = useSEO()

  const {
    title = state?.title,
    description = state?.description,
    image = state?.image,
    lang = state?.lang,
    twitter = state?.twitter,
    titleTemplate = state?.titleTemplate,
    siteUrl = state?.siteUrl,
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

function useSEO(): {
  state: SEOProps | undefined
  setState: SEOContextType['setState']
} {
  const { state, setState } = React.useContext(SEOContext)

  if (typeof state === undefined) {
    throw new Error('SEO component must be used within an SEOProvider')
  }

  return { state, setState }
}

export { SEOProvider, SEO, useSEO }
