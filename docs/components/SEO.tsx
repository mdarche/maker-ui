import Head from 'next/head'

export interface SEOProps {
  title: string
  description?: string
}

export const SEO = ({ title, description }: SEOProps) => {
  return (
    <Head>
      <title>{title} - Maker UI</title>
      <meta name="description" content={description} />
    </Head>
  )
}
