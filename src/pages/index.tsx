import { Heading, ListItem, UnorderedList } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { LinkComponent } from 'components/layout/LinkComponent'
import HeroSection from 'components/layout/HeroSection'

export default function Home() {
  return (
    <>
      <Head />

      <main>
        <HeroSection />
        <UnorderedList>
          <ListItem>
            <LinkComponent href="/examples/sign">Sign & verify messages</LinkComponent>
          </ListItem>
          <ListItem>
            <LinkComponent href="/examples/siwe">Sign-in With Ethereum</LinkComponent>
          </ListItem>
        </UnorderedList>
      </main>
    </>
  )
}
