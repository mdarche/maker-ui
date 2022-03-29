import { ToastProvider } from '@maker-ui/notifications'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {asPath.includes('/layouts/') || asPath.includes('/headers/') ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </Layout>
      )}
    </>
  )
}
