import React from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'
import { MediaRenderer } from '@thirdweb-dev/react'
import useLogin from 'lib/auth/useLogin'
import useLensUser from 'lib/auth/useLensUser'

type Props = {}

export default function SignInButton({}: Props) {
  const { isConnected } = useAccount() // Detect the connected address
  const { chain } = useNetwork() // Detect if the user is on the wrong network
  //   const { chains, error, isError, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork() // Function to switch the network.
  const { isSignedInQuery, profileQuery } = useLensUser()
  const { mutate: requestLogin } = useLogin()

  // 1. User needs to connect their wallet
  //show button if connected or not connected
  if (!isConnected) {
    return <ConnectKitButton />
  }
  // Loading their signed in state
  if (isSignedInQuery.isLoading) {
    return <div>Loading...</div>
  }

  // If the user is not signed in, we need to request a login
  if (!isSignedInQuery.data) {
    return (
      <ButtonGroup>
        <ConnectKitButton />
        <Button onClick={() => requestLogin()}>🌿 Sign in with Lens</Button>
      </ButtonGroup>
    )
  }

  // Loading their profile information
  if (profileQuery.isLoading) {
    return <div>Loading...</div>
  }

  // If it's done loading and there's no default profile
  if (!profileQuery.data?.defaultProfile) {
    return <div>No Lens Profile.</div>
  }

  // If it's done loading and there's a default profile
  if (profileQuery.data?.defaultProfile) {
    return (
      <Box>
        <MediaRenderer
          // @ts-ignore
          src={profileQuery?.data?.defaultProfile?.picture?.original?.url || ''}
          alt={profileQuery.data.defaultProfile.name || ''}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
          }}
        />
      </Box>
    )
  }

  return <Box>Something went wrong.</Box>
}
