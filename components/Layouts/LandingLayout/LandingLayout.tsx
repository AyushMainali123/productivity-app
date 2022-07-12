/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */

import { Box, Button, HStack, Link, StackItem, useBreakpointValue } from "@chakra-ui/react";
import Footer from "components/ui/Footer";
import Image from "next/image";
import NextLink from 'next/link';


interface LandingLayoutProps {
    children: React.ReactNode;
}

interface LandingNavbarProps {
    isAuthenticated: boolean;
}


/* ----------------------------- Interface Ends ----------------------------- */


/* -------------------------------------------------------------------------- */
/*                            Sub Component Starts                            */
/* -------------------------------------------------------------------------- */

const LandingNavbar = ({ isAuthenticated }: LandingNavbarProps) => {

    const isCurrentResolutionPC = useBreakpointValue({ base: false, lg: true })

    return (
        <Box as={"nav"} px={{ base: "12px", md: "24" }} maxW={"8xl"} m={"auto"}>
            <HStack justifyContent={"space-between"}>

                {/* Left Navbar */}
                <StackItem as={NextLink} href={"/"} passHref >
                    <Image src={"/svg/TimerHUT.svg"} alt={"Logo"} width={isCurrentResolutionPC ? "200" : "140"} height={isCurrentResolutionPC ? "30" : "55"} objectFit={"contain"} style={{ cursor: "pointer" }} />
                </StackItem>


                {/* Right Navbar */}
                {
                    !!isCurrentResolutionPC && (
                        <StackItem>
                            <HStack gap={6}>
                                {
                                    !isAuthenticated && (
                                        <>
                                            <StackItem as={NextLink} href={"/signin"} passHref>
                                                <Link>Login</Link>
                                            </StackItem>
                                            <StackItem as={NextLink} href={"/signup"} passHref>
                                                <Button bg={"white"} color={"black"} _hover={{ bg: "rgba(255, 255, 255, 0.6)" }} fontSize={{ base: "md", lg: "xl" }}>Signup</Button>
                                            </StackItem>
                                        </>
                                    )
                                }

                                {
                                    !!isAuthenticated && (
                                        <>
                                            <StackItem as={NextLink} href={"/focus-time"} passHref>
                                                <Button bg={"white"} color={"black"} _hover={{ bg: "rgba(255, 255, 255, 0.6)" }} fontSize={{ base: "md", lg: "xl" }}>Go to pomodoro</Button>
                                            </StackItem>
                                        </>
                                    )
                                }

                            </HStack>
                        </StackItem>
                    )
                }

            </HStack>
        </Box>
    )
}


/* --------------------------- Sub Component Ends --------------------------- */

/* -------------------------------------------------------------------------- */
/*                            Main Component Starts                           */
/* -------------------------------------------------------------------------- */

const LandingLayout = ({ children }: LandingLayoutProps) => {

    return (
        <Box
            bgGradient={"linear-gradient(112.68deg, rgba(84, 121, 139, 0.5) 0%, rgba(18, 25, 29, 1) 100%)"}
            pt={14} pb={5}
        >

            {/* {
                !!isPCBreakpoint && (<Image src={"/svg/landing-line.svg"} alt={"Landing Line"} layout={"fill"} />)
            } */}

            <LandingNavbar isAuthenticated={true} />
            <Box as={"main"} maxW={"8xl"} m={"auto"}  >
                {children}
            </Box>
            <Footer background="transparent" />
        </Box>
    )
}

/* --------------------------- Main Component Ends -------------------------- */

export default LandingLayout;
