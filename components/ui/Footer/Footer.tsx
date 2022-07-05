import { Center, Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

const Footer = () => {
    return (
        <Center as={"footer"} bg={"black.primary"} py={"12px"} gap={5}>
            
            {/* planetscale Link */}
            <Center gap={2}>
                <Image src={"/svg/planetscale.svg"} alt={"planetscale logo"} height={"30px"} width={"30px"} />
                <NextLink href={"https://planetscale.com"} passHref >
                    <Link target={"_blank"}>
                        https://planetscale.com
                    </Link>
                </NextLink>
            </Center>


            {/* Hashnode Link */}
            <Center gap={2}>
                <Image src={"/svg/hashnode.svg"} alt={"hashnode logo"} height={"30px"} width={"30px"} />
                <NextLink href={"https://hashnode.com"} passHref>
                    <Link target={"_blank"}>
                        https://hashnode.com
                    </Link>
                </NextLink>
            </Center>
        </Center>
    )
}

export default Footer;