import React from 'react'
import { default as NextHead } from 'next/head'
import { SITE_DESCRIPTION, SITE_NAME } from 'utils/config'
import { getCssText } from '@livepeer/react'

interface Props {
  title?: string
  description?: string
}

export function Head(props: Props) {
  return (
    <NextHead>
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      <title>{props.title ?? SITE_NAME}</title>
      <meta name="description" content={props.description ?? SITE_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}
