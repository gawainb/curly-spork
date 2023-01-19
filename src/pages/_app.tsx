import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Layout } from 'components/layout'
import { Web3Provider } from 'providers/Web3'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()

  // Create a client
  const queryClient = new QueryClient()

  return (
    <ChakraProvider>
      <Seo />
      <Web3Provider>
        {isMounted && (
          <Layout>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </Layout>
        )}
      </Web3Provider>
    </ChakraProvider>
  )
}
