import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export interface SEOProps {
  title?: string
  noTemplate?: boolean
  description?: string
  image?: string
}

export interface SEOConfig {
  rootUrl: string
  siteName: string
  format?: '-' | '|'
  defaults: {
    title: string
    description: string
    image?: string
  }
}

/**
 * An SEO shortcut component that lets individual pages show fallback information or
 * custom titles, descriptions, and social share images.
 */
export const SEO = ({
  title,
  description,
  image,
  noTemplate = false,
}: SEOProps) => {
  const { asPath } = useRouter()

  const config = {
    rootUrl: 'https://maker-ui.com',
    siteName: 'E2E App',
    format: '-',
    defaults: {
      title: 'Testing App - E2E Component Demo',
      description:
        'This is a sample application for the purpose of testing the component library in a Nextjs application',
      image: undefined,
    },
  }

  const postTitle =
    title && noTemplate
      ? title
      : title
      ? `${title} ${config.format} ${config.siteName}`
      : config.defaults.title
  const postDescription = description || config.defaults.description
  const shareImage = image || config.defaults?.image

  return (
    <Head>
      <title key="title">{postTitle}</title>
      <meta name="description" key="description" content={postDescription} />
      <meta
        property="og:url"
        content={`${config.rootUrl}${asPath}`}
        key="ogurl"
      />
      <meta name="twitter:title" content={postTitle} key="twcard" />
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      {shareImage ? (
        <meta
          property="og:image"
          content={image || config.defaults.image}
          key="ogimage"
        />
      ) : null}
      <meta
        property="og:site_name"
        content={config.siteName}
        key="ogsitename"
      />
      <meta property="og:title" content={postTitle} key="ogtitle" />
      <meta
        property="og:description"
        content={postDescription}
        key="ogdescription"
      />
    </Head>
  )
}
