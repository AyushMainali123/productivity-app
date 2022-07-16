
import { Alert, AlertIcon, Box, Center, HStack, StackItem } from "@chakra-ui/react";
import Footer from "components/ui/Footer";
import Navbar from "components/ui/Navbar";


/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */
interface LoginSignUpLayoutProps {
    children: React.ReactNode;
}

/* ----------------------------- Interface Ends ----------------------------- */

const LoginSignupLayout = ({ children }: LoginSignUpLayoutProps) => {


    return (
        <>
            <Navbar isAuthenticated={false} />
            <Alert status='info' variant={"solid"}>
                <HStack width={"100vw"} maxWidth={"8xl"} margin={"auto"} flexWrap={"wrap"}>
                    <StackItem>
                        <AlertIcon />
                    </StackItem>
                    <StackItem maxW={"100vw"} pr={4}>
                        Login and Signup via google is only available at the moment.
                    </StackItem>
                </HStack>
            </Alert>
            <Center as={"main"} padding={"0px 40px"} background={"baseBackground"} minHeight={"calc(100vh - 55px)"}>
                <Center
                    position={"relative"}
                    minH={{ md: "800px" }}
                    w={{ md: "800px" }}
                    margin={"auto"}
                    tabIndex={-1}
                    bgImage={{ base: "none", md: "url('/images/loginsignup/clock.png')" }}
                    backgroundPosition={"center"}
                    backgroundRepeat={"no-repeat"}
                    backgroundSize={"contain"}
                >
                    <Box as={"main"}>
                        {children}
                    </Box>
                </Center>
            </Center>

            <Footer />
        </>
    )
}

export default LoginSignupLayout;