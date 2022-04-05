import React, { useState, useEffect, createContext, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { merge } from '@maker-ui/utils'

export interface SEOProps {
  title?: string
  noTemplate?: boolean
  description?: string
  shareImage?: string
}

interface SEOState {
  rootUrl: string
  siteName: string
  format?: '-' | '|'
  defaults: {
    title: string
    description: string
    image: string
  }
}

export interface SEOProviderProps extends SEOState {
  children: React.ReactNode
}

const initialState = {
  rootUrl: '',
  siteName: '',
  defaults: {
    title: '',
    description: '',
    image: '',
  },
}

const SEOContext = createContext<{
  state: SEOState
  setState: React.Dispatch<React.SetStateAction<SEOState>>
}>({ state: initialState, setState: (b) => {} })

export const SEOProvider = ({ children, ...props }: SEOProviderProps) => {
  const [state, setState] = useState<SEOState>(initialState)

  useEffect(() => {
    setState((s) => merge(s, props))
  }, [props])

  return (
    <SEOContext.Provider value={{ state, setState }}>
      <SEO />
      {children}
    </SEOContext.Provider>
  )
}

function useSEO() {
  const {
    state: { defaults, rootUrl, siteName },
  } = useContext(SEOContext)
  return { defaults, rootUrl, siteName }
}

/**
 * An SEO shortcut component that lets individual pages show fallback information or
 * custom titles, descriptions, and social share images.
 */
export const SEO = ({
  title,
  description,
  shareImage,
  noTemplate = false,
}: SEOProps) => {
  const { asPath } = useRouter()
  const { defaults, rootUrl, siteName } = useSEO()

  const postTitle =
    title && noTemplate
      ? title
      : title
      ? `${title} - ${siteName}`
      : defaults.title
  const postDescription = description || defaults.description

  return (
    <Head>
      <title key="title">{postTitle}</title>
      <meta name="description" key="description" content={postDescription} />
      <meta property="og:url" content={`${rootUrl}${asPath}`} key="ogurl" />
      <meta name="twitter:title" content={postTitle} key="twcard" />
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta
        property="og:image"
        content={shareImage || defaults.image}
        key="ogimage"
      />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={postTitle} key="ogtitle" />
      <meta
        property="og:description"
        content={postDescription}
        key="ogdescription"
      />
    </Head>
  )
}
