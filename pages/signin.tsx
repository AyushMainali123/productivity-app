import { Box, Button, Input, InputGroup, InputRightElement, Link } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import LoginSignupLayout from 'components/Layouts/LoginSignupLayout'
import type { NextPageContext } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, getProviders, getSession, LiteralUnion, signIn } from 'next-auth/react'
import NextLink from 'next/link'
import { useState } from 'react'


const INITIAL_STATE = {
    isPasswordVisible: false
}

interface SignInProps {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}


const SignIn = ({ providers }: SignInProps) => {

    const [isPasswordVisible, setPasswordVisible] = useState(INITIAL_STATE.isPasswordVisible)


    /**
     * * Logic for form submit
     */
    const handleFormSubmit = () => {}


    return (
        <LoginSignupLayout>

            <Box maxW={"300px"} margin={"auto"} as={"form"} onSubmit={handleFormSubmit}>
                <Box as={"h4"} minW={"300px"} fontWeight={"semibold"} fontSize={"lg"} mb={{ base: 2, lg: 3 }}>Sign in</Box>

                {/* Single Input Containers */}

                {/* Username input */}
                <Box mb={2}>
                    <Box as={"label"} htmlFor={"username"} display={"inline-block"} mb={1}>Username</Box>
                    <Input type={"text"} id={"username"} size={"sm"} borderColor={"white"} disabled />
                </Box>

                {/* password input */}
                <Box mb={3}>
                    <Box as={"label"} htmlFor={"password"} display={"inline-block"} mb={1}>Password</Box>
                    <InputGroup>
                        <Input type={isPasswordVisible ? "text" : "password"} id={"password"} size={"sm"} borderColor={"white"} disabled/>
                        <InputRightElement
                            mt={"6px"}
                            variant={"ghost"}
                            padding={0}
                            as={Button}
                            width={"20px"} height={"20px"} onClick={() => setPasswordVisible(prev => !prev)}>
                            {
                                isPasswordVisible ?
                                    <Icon icon="akar-icons:eye-open" color="white" /> :
                                    <Icon icon="akar-icons:eye-closed" color="white" />
                            }
                        </InputRightElement>
                    </InputGroup>
                </Box>

                <Button
                    type="submit"
                    w={"full"}
                    bgColor={"black.secondary"}
                    size={"sm"}
                    border={"1px solid white"}
                    borderRadius={"sm"}
                    disabled
                >
                    Sign in
                </Button>

                <Box my={2} textAlign={"center"} fontSize={"lg"} fontWeight={"semibold"}>Or</Box>

                <Button
                    type="button"
                    w={"full"}
                    bgColor={"black.secondary"}
                    size={"sm"}
                    border={"1px solid white"}
                    borderRadius={"sm"}
                    leftIcon={<Icon icon={"akar-icons:google-fill"} width={"18px"} height={"18px"} color={"white"} />}
                    onClick={() => signIn(providers?.google.id)}
                >
                    <Box as={"span"}>Continue with {providers?.google.name}</Box>
                </Button>

            </Box>
            <Box as={"p"} mt={6} fontSize={"lg"} textAlign={"center"}>
                <Box as={"span"} mr={1}>Dont have an account?</Box>
                <NextLink href={"/signup"} passHref>
                    <Link color={"#BEE3F8"}>Sign up</Link>
                </NextLink>
            </Box>
        </LoginSignupLayout>
    )
}

export default SignIn






export async function getServerSideProps(context: NextPageContext) {


    const session = await getSession({ req: context.req });

    // If the user is signed in, redirect them to /focus-time page 
    if (session?.user) {
        return {
            redirect: {
                destination: '/focus-time',
                permanent: false,
            },
        };
    }

    // Sending providers (google in this case) to the signin route
    const providers = await getProviders();
    return {
        props: { providers },
    };
}