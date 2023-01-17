import { type AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
