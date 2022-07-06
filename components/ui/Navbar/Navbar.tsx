import {
    Avatar, Box, Button, Drawer, DrawerContent, DrawerOverlay, HStack, Link, ListItem, Menu,
    MenuButton, MenuItem, MenuList, StackItem, UnorderedList, useBreakpointValue, useDisclosure
} from "@chakra-ui/react";
import { Icon } from '@iconify/react';
import Image from "next/image";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { navDatas } from "./Navbar.sampledata";



/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */

interface NavbarProps {
    isAuthenticated: boolean;
}

/* ----------------------------- Interface Ends ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                            Sub Component Starts                            */
/* -------------------------------------------------------------------------- */

const SideNavDatas = ({ datas }: { datas: typeof navDatas }) => {

    const router = useRouter();

    return (
        <UnorderedList margin={0}>
            {
                datas.map(data => (
                    <ListItem key={data.id} listStyleType={"none"} >
                        <NextLink href={data.path} passHref>
                            <Link
                                display={"flex"}
                                alignItems={"center"}
                                gap={"15px"}
                                textDecoration={"none"}
                                paddingY={"12px"}
                                paddingLeft={"40px"}
                                _active={{ background: "rgba(122, 122, 122, 0.5)" }}
                                _hover={{ background: "rgba(122, 122, 122, 0.3)" }}
                                background={router.asPath === data.path ? "rgba(122, 122, 122, 0.3)" : ""}
                            >
                                <Icon icon={data.icon} width={"20px"} height={"20px"} />
                                <Box as={"span"} marginLeft={"17px"}>{data.title}</Box>
                            </Link>
                        </NextLink>
                    </ListItem>
                ))
            }
        </UnorderedList>
    )
}


/* --------------------------- Sub Component Ends --------------------------- */

const Navbar = ({isAuthenticated}: NavbarProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const isPCScreen = useBreakpointValue({base: false, lg: true})
    
    return (
        <Box as={"nav"} px={{base: "12px", md: "30px"}} bgColor={"black.primary"} >

            {/* Top Navigation Starts */}
            <HStack justifyContent={"space-between"} maxWidth={"8xl"} margin={"auto"}>

                {/* Left navigation */}
                <StackItem>
                    <HStack gap={"10px"}>

                        {/* Show hamburger if the user is authenticated */}
                        {
                            !!isAuthenticated && (
                                <StackItem>
                                    <Button variant={"ghost"} onClick={onOpen} paddingX={1} data-testid="drawerOpen-hamburger">
                                        <Icon icon={"cil:hamburger-menu"} width={24} height={24} />
                                    </Button>
                                </StackItem>
                            )
                        }

                        <StackItem as={NextLink} href={"/"} passHref >
                            <Image src={"/svg/TimerHUT.svg"} alt={"Logo"} width={"140"} height={"55"} objectFit={"contain"} style={{ cursor: "pointer" }} />
                        </StackItem>
                    </HStack>
                </StackItem>

                {/* Right Navigation */}

                
                {/* Show rightsidebar if the user is authenticated */}
                {
                    !!isAuthenticated && (
                        <StackItem>
                            <HStack as={"ul"} gap={"20px"}>

                                {/* Only show the user name if the user is on PC */}
                                {
                                    !!isPCScreen && (
                                        <StackItem as={"li"} fontSize={"16px"}>
                                            {`Sujata Karki's`} Workspace
                                        </StackItem>
                                    )
                                }
                                
                                <StackItem as={"li"} fontSize={"20px"}>
                                    <Icon icon={"ion:notifications-outline"} width={"25"} height={"25"} />
                                </StackItem>
                                <StackItem as={"li"} fontSize={"20px"}>
                                    <Menu >
                                        <MenuButton as={"button"}>
                                            <Avatar name="Sujata Karki" size="sm" fontSize={"16px"} />
                                        </MenuButton>
                                        <MenuList background={"black.primary"} fontSize={"16px"} padding={0}>
                                            <MenuItem fontSize={{ base: "xs", md: "md" }}>Log out</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </StackItem>
                            </HStack>
                        </StackItem>
                    )
                }
               
            </HStack>


            {/* Navigation Drawer Component Starts */}
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement={"left"}
            >
                <DrawerOverlay />
                <DrawerContent backgroundColor={"black.primary"}>
                    <Box as={"aside"}>
                        <HStack gap={"10px"} padding={"0px 30px"}>
                            <StackItem>
                                <Button variant={"ghost"} onClick={onClose} paddingX={1} data-testid="drawerClose-hamburger">
                                    <Icon icon={"cil:hamburger-menu"} width={24} height={24} />
                                </Button>
                            </StackItem>
                            <StackItem height={"54px"} as={NextLink} href={"/"} passHref>
                                <Image src={"/svg/TimerHUT.svg"} alt={"Logo"} width={"140"} height={"55"} objectFit={"contain"} style={{ cursor: "pointer" }} />
                            </StackItem>
                        </HStack>


                        {/* Side Navbar Data List is rendered in this component */}
                        <SideNavDatas datas={navDatas} />
                    </Box>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Navbar;