import type { AppProps } from 'next/app'
import { createReactClient, studioProvider, LivepeerConfig } from '@livepeer/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from 'components/layout'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'

import { WagmiConfig, createClient } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const wagmiClient = createClient(
  getDefaultClient({
    appName: 'Creative TV',
  })
)

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
        {isMounted && (
          <WagmiConfig client={wagmiClient}>
            <ConnectKitProvider>
              <QueryClientProvider client={queryClient}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </QueryClientProvider>
            </ConnectKitProvider>
          </WagmiConfig>
        )}
      </ChakraProvider>
    </LivepeerConfig>
  )
}
