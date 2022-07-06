import { Center, Link, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

const Footer = () => {

    const isPCScreen = useBreakpointValue({ base: false, lg: true })
    return (
        <Center as={"footer"} bg={"black.primary"} py={"12px"} gap={5}>

            {/* planetscale Link */}
            <Center gap={2}>
                <NextLink href={"https://planetscale.com"} passHref >
                    <Link target={"_blank"} >
                        <Image src={"/svg/planetscale.svg"} alt={"planetscale logo"} height={"30px"} width={"30px"} />
                    </Link>
                </NextLink>

                
                {/* Only render the text link on PC */}
                {
                    !!isPCScreen && (
                        <NextLink href={"https://planetscale.com"} passHref >
                            <Link target={"_blank"}>
                                https://planetscale.com
                            </Link>
                        </NextLink>
                    )
                }

            </Center>


            {/* Hashnode Link */}
            <Center gap={2}>
                <NextLink href={"https://hashnode.com"} passHref >
                    <Link target={"_blank"} >
                        <Image src={"/svg/hashnode.svg"} alt={"hashnode logo"} height={"30px"} width={"30px"} />
                    </Link>
                </NextLink>

                {/* Only render the text link on PC */}
                {
                    !!isPCScreen && (
                        <NextLink href={"https://hashnode.com"} passHref>
                            <Link target={"_blank"}>
                                https://hashnode.com
                            </Link>
                        </NextLink>
                    )
                }
              
            </Center>
        </Center>
    )
}

export default Footer;