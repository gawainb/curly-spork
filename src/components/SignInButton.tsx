import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Box, ButtonGroup } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'

import useLogin from 'lib/auth/useLogin'
import useLensUser from 'lib/auth/useLensUser'

type Props = {}

export default function SignInButton({}: Props) {
  const { isConnected } = useAccount() // Detect the connected address
  const { isSignedInQuery, profileQuery } = useLensUser()
  const { mutate: requestLogin } = useLogin()

  useEffect(() => {
    if (isConnected) {
      requestLogin()
    }
  }, [isConnected, requestLogin])

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
      </ButtonGroup>
    )
  }

  // Loading their profile information
  if (profileQuery.isLoading) {
    return <div>Loading...</div>
  }

  // If it's done loading and there's no default profile
  if (!profileQuery.data?.defaultProfile) {
    return (
      <ButtonGroup display="flex" alignItems="center">
        <ConnectKitButton />
        <Box>No Lens Profile.</Box>
      </ButtonGroup>
    )
  }

  // If it's done loading and there's a default profile
  if (profileQuery.data?.defaultProfile) {
    return (
      <ButtonGroup display="flex" alignItems="center">
        <ConnectKitButton />
        <Box
          // @ts-ignore
          src={profileQuery?.data?.defaultProfile?.picture?.original?.url || ''}
          alt={profileQuery.data.defaultProfile.name || ''}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
          }}
        />
      </ButtonGroup>
    )
  }

  return <Box>Something went wrong.</Box>
}
