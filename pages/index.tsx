import { Box, Button, Stack, StackItem } from '@chakra-ui/react'
import LandingLayout from 'components/Layouts/LandingLayout'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import NextLink from 'next/link'

const Home: NextPage = () => {


  const session = useSession();


  return (
    <LandingLayout>
      <Stack
        direction={{ base: "column", lg: "row-reverse" }}
        justifyContent={"space-between"}
        gap={2}
        my={{ base: 20, lg: 16 }}
        px={{ base: "12px", md: "24" }}
      >
        
        {/* Banner Illustration */}
        <StackItem >
          <Box
            position={"relative"}
            minH={{ base: "285px", lg: "320px", xl: "492px" }}
            w={{ base: "300px",  lg: "303px", xl: "500px" }}
            mb={2}
          >
            <Image src={"/svg/landing-illus.svg"} layout={"fill"} alt={"Pomodoro Illustration"} objectFit={"cover"} priority={true} />
          </Box>
        </StackItem>


        {/* Banner CTA Section */}
        <StackItem px={{ base: "12px", md: 0 }}>
          <Box as={"h1"} fontSize={{ base: "xl", md: "2xl", lg: "3xl", xl: "4xl" }} lineHeight={1.3} mt={{ base: 0, md: "8", lg: "16" }}>
            <Box> Manage your</Box>
            <Box>daily tasks</Box>
            <Box> with <Box as={"span"} color={"#BEE3F8"}>Pomodoro!</Box></Box>
          </Box>
          <Box as={"p"} fontSize={{ base: "md", lg: "lg", xl: "xl" }} my={"6"} maxW={"500px"}>
            Pomodoro timer is the easiest way to avoid procrastinations and boost your daily productivity.
          </Box>
          <StackItem as={NextLink} href={session.status === "authenticated" ?  "/focus-time" : "/signup"} passHref>
            <Button mt={6} bg={"white"} color={"black"} _hover={{ bg: "rgba(255, 255, 255, 0.6)" }} fontSize={{ base: "md", lg: "xl" }}>
              Get Started
            </Button>
          </StackItem>
        </StackItem>
      </Stack>
    </LandingLayout>
  )
}

export default Home
