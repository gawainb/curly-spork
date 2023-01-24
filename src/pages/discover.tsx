import React, { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Box,
  SimpleGrid,
  AspectRatio,
  Badge,
} from '@chakra-ui/react'
import axios from 'axios'
import { motion } from 'framer-motion'
interface HeaderProps {
  children: ReactNode
}

const AllAssets = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()
  const [data, setData] = useState<any[]>([])

  // For Live
  useEffect(() => {
    try {
      fetch('https://livepeer.studio/api/asset', {
        method: 'GET',
        headers: {
          Authorization: `Bearer fc15d8a5-210b-4784-9db9-e5d2add9166d`,
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res))
    } catch (error) {
      console.log('Error is ', error)
    }
  }, [])

  // For Local
  // useEffect(() => {
  //     fetch("/api/all-assets")
  //       .then((res) => res.json())
  //       .then((res) => setData(JSON.parse(res.data)));
  //   }, []);

  return (
    <Box>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
        {data.slice(0, data.length).map((post, index) => (
          <Card key={post.id}>
            <CardBody>
              <AspectRatio maxW="560px" ratio={1}>
                <iframe title="naruto" src={post.downloadUrl} allowFullScreen />
              </AspectRatio>
              <Stack mt="6" spacing="3">
                <Heading size="md">{post.name}</Heading>
              </Stack>
              {post.status.phase == 'ready' ? (
                <Badge colorScheme="green">{post.status.phase}</Badge>
              ) : (
                <Badge colorScheme="red">{post.status.phase}</Badge>
              )}
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2" className="assets-btn-group">
                {post?.status?.phase === 'ready' && post?.storage?.status?.phase !== 'ready' ? (
                  <Button
                    onClick={() => router.push(`/pages/mint-nft-video?assetId=${post.id}`)}
                    className="card-mint-button"
                    as={motion.div}
                    _hover={{ transform: 'scale(1.1)' }}>
                    Update Asset
                  </Button>
                ) : (
                  <Button disabled className="card-mint-button">
                    Update Asset
                  </Button>
                )}
                {post.status.phase == 'ready' ? (
                  <Button
                    onClick={() => router.push(`/pages/mint-nft-video?assetId=${post.id}`)}
                    className="card-mint-button"
                    as={motion.div}
                    _hover={{ transform: 'scale(1.1)' }}>
                    Mint NFT
                  </Button>
                ) : (
                  <Button disabled className="card-mint-button">
                    Mint NFT
                  </Button>
                )}
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}
export default AllAssets
