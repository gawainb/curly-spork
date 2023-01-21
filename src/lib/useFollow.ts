import { useMutation } from '@tanstack/react-query'
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from '../utils/config'
import { useCreateFollowTypedDataMutation } from '../graphql/generated'
import useLogin from './auth/useLogin'
import { splitSignature } from './helpers'
import { useAccount, useContract } from 'wagmi'
import { signTypedData } from '@wagmi/core'

export function useFollow() {
  const { mutateAsync: requestTypedData } = useCreateFollowTypedDataMutation()
  const { address } = useAccount()
  const { mutateAsync: loginUser } = useLogin()
  const contract = useContract({ address: LENS_CONTRACT_ADDRESS, abi: LENS_CONTRACT_ABI })

  async function follow(userId: string) {
    // 0. Login
    await loginUser()

    // 1. Use the auto generated mutation called "usecreateFollowTypedData"
    // to get the typed data for the user to sign
    const typedData = await requestTypedData({
      request: { follow: [{ profile: userId }] },
    })

    const { domain, types, value } = typedData.createFollowTypedData.typedData

    // 2. Sign the typed data using the SDK
    const signature = await signTypedData({ domain, types: { FollowWithSig: types.FollowWithSig }, value })

    const { v, r, s } = splitSignature(signature)

    // Call the smart contract function called "followWithSig"
    const result = await contract?.call('followWithSig', {
      follower: address,
      profileIds: [userId],
      datas: value.datas,
      sig: {
        v,
        r,
        s,
        deadline: value.deadline,
      },
    })

    console.log(result)
  }

  return useMutation(follow)
}
