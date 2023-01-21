import { ethers } from 'ethers'
import omitDeep from 'omit-deep'

// 1. Sign typed data with omitted __typename values using omit-deep
export function omitTypename(object: any) {
  return omitDeep(object, ['__typename'])
}

// 2. Split the signature to extract the "v", "r", and "s" values
export function splitSignature(signature: string) {
  return ethers.utils.splitSignature(signature)
}
