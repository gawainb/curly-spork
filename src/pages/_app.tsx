import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import { Layout } from 'components/layout'
import { Web3Provider } from 'providers/Web3'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  const desiredChainId = ChainId.Polygon

  // Create a client
  const queryClient = new QueryClient()

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
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
    </ThirdwebProvider>
  )
}
