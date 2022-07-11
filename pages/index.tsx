import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'


const Home: NextPage = () => {

  return (
    <Box as={"section"} maxW={"8xl"} m={"auto"} px={{ base: 0, md: "30px", '2xl': "0px" }}>
      <Box>This is landing page</Box>
    </Box>
  )
}

export default Home
