import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
import { readAccessToken } from './helpers'
import { useDefaultProfileQuery } from '../../graphql/generated'

export default function useLensUser() {
  // 1. Make a react query for the local storage Key
  const { address } = useAccount()

  const localStorageQuery = useQuery(
    ['lens-user', address],
    // Writing the actual function to check the local storage
    () => readAccessToken()
  )

  // If there is a connected wallet address
  // Then we can ask for the default profile from Lens
  const profileQuery = useDefaultProfileQuery(
    {
      request: {
        ethereumAddress: address,
      },
    },
    {
      enabled: !!address,
    }
  )

  console.log(profileQuery.data?.defaultProfile)

  return {
    // Contains information about both the local storage
    // AND the information about the lens profile
    isSignedInQuery: localStorageQuery,
    profileQuery: profileQuery,
  }
}
