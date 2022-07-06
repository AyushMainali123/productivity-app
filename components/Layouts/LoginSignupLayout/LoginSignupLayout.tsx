/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */

import { Box, Center } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Footer from "components/ui/Footer";
import Navbar from "components/ui/Navbar";
import Image from "next/image";

interface LoginSignUpLayoutProps {
    children: React.ReactNode;
}

/* ----------------------------- Interface Ends ----------------------------- */

const LoginSignupLayout = ({ children }: LoginSignUpLayoutProps) => {
    return (
        <>
            <Navbar isAuthenticated={false} />
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