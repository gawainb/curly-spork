import type { AppProps } from 'next/app'
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

  return (
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
  )
}
