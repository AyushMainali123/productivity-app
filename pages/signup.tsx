import { Box, Button, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import LoginSignupLayout from "components/Layouts/LoginSignupLayout";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";


const INITIAL_STATE = {
    isPasswordVisible: false
}

const SignUp = () => {

    const [isPasswordVisible, setPasswordVisible] = useState(INITIAL_STATE.isPasswordVisible)
    const toast = useToast();

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        toast({
            title: 'WIP',
            description: "Cannot Signup at this moment. Please use google auth instead.",
            status: 'info',
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <LoginSignupLayout>
            <Box as={"h2"} fontSize={{ base: "xl", lg: "3xl" }} mb={2} textAlign={"center"}>Get Started with Timerhut</Box>
            <Box as={"p"} textAlign={"center"} fontSize={"sm"}>Create an account to track your time and increase your productivity</Box>

            <Box maxW={"300px"} margin={"auto"} as={"form"} onSubmit={handleFormSubmit}>
                <Box as={"h4"} minW={"300px"} fontWeight={"semibold"} fontSize={"lg"} mt={{ base: 2, lg: 3 }} mb={{ base: 2, lg: 3 }}>Sign Up</Box>

                {/* Single Input Containers */}

                {/* Username input */}
                <Box mb={2}>
                    <Box as={"label"} htmlFor={"username"} display={"inline-block"} mb={1}>Username</Box>
                    <Input type={"text"} id={"username"} size={"sm"} borderColor={"white"} />
                </Box>

                {/* email input */}
                <Box mb={2}>
                    <Box as={"label"} htmlFor={"useremail"} display={"inline-block"} mb={1}>Email Address</Box>
                    <Input type={"email"} id={"useremail"} size={"sm"} borderColor={"white"} />
                </Box>

                {/* password input */}
                <Box mb={3}>
                    <Box as={"label"} htmlFor={"password"} display={"inline-block"} mb={1}>Password</Box>
                    <InputGroup>
                        <Input type={isPasswordVisible ? "text" : "password"} id={"password"} size={"sm"} borderColor={"white"} />
                        <InputRightElement mt={"6px"} variant={"ghost"} padding={0} as={Button} width={"20px"} height={"20px"} onClick={() => setPasswordVisible(prev => !prev)}>
                            {
                                isPasswordVisible ?
                                    <Icon icon="akar-icons:eye-open" color="white" /> :
                                    <Icon icon="akar-icons:eye-closed" color="white"  />
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
                >
                    Signup
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
                    onClick = {() => signIn()}
                >
                    <Box as={"span"}>Continue with google</Box>
                </Button>

            </Box>
        </LoginSignupLayout>
    )
}

export default SignUp;