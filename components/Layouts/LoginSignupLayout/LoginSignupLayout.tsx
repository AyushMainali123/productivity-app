/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */

import { Alert, AlertIcon, Box, Center } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Footer from "components/ui/Footer";
import Navbar from "components/ui/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface LoginSignUpLayoutProps {
    children: React.ReactNode;
}

/* ----------------------------- Interface Ends ----------------------------- */

const LoginSignupLayout = ({ children }: LoginSignUpLayoutProps) => {

    const session = useSession();
    const router = useRouter();


    if (session.status === "authenticated") {
        router.push("/focus-time");
        return null;
    }

    return (
        <>
            <Navbar isAuthenticated={false} />
            <Alert status='info' variant={"solid"}>
                <AlertIcon />
                Login and Signup via google is only available at the moment.
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
                    <Box>
                        {children}
                    </Box>
                </Center>
            </Center>

            <Footer />
        </>
    )
}

export default LoginSignupLayout;