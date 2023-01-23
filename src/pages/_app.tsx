import type { AppProps } from 'next/app'
import { createReactClient, studioProvider, LivepeerConfig } from '@livepeer/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import { Layout } from 'components/layout'
import { Web3Provider } from 'providers/Web3'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  // Create a client
  const queryClient = new QueryClient()
  const client = createReactClient({
    provider: studioProvider({ apiKey: 'fc15d8a5-210b-4784-9db9-e5d2add9166d' }),
  })

  return (
    <LivepeerConfig client={client}>
      <ChakraProvider>
        <Seo />
        <Web3Provider>
          {isMounted && (
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          )}
        </Web3Provider>
      </ChakraProvider>
    </LivepeerConfig>
  )
}
