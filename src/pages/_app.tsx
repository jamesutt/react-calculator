import { type AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
