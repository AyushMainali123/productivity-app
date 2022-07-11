import { Box, HStack, Select, StackItem } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import AuthLayout from "components/Layouts/AuthLayout"

const Settings = () => {
    return (
        <AuthLayout>
            <Box as={"section"} maxW={"8xl"} m={"auto"} px={{ base: 0, md: "30px", '2xl': "0px" }}>
                <Box as={"h2"} fontSize={"2xl"} mt={10} mb={7}>Settings</Box>
                <HStack bg={"black.primary"} px={5} py={3} fontWeight={"medium"} fontSize={"large"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"}>
                    <StackItem>
                        <Icon icon={"icon-park-outline:timer"} width={22} height={22} color={"#BEE3F8"} />
                    </StackItem>
                    <StackItem>
                        <Box as={"h3"}>Pomodoro Timer</Box>
                    </StackItem>
                </HStack>

                {/* Pomodoro Length Section */}
                <Box my={7}>
                    <HStack flexWrap={"wrap"} gap={1}>
                        <StackItem as={"h5"} width={"150px"}>
                            Pomodoro Length
                        </StackItem>
                        <StackItem m={0}>
                            <Select defaultValue={1} >
                                <option value={1}>1 minutes</option>
                                <option value={2}>2 minutes</option>
                                <option value={3}>3 minutes</option>
                            </Select>
                        </StackItem>
                    </HStack>
                </Box>

                {/* Break Length Section */}
                <Box my={7}>
                    <HStack flexWrap={"wrap"} gap={1}>
                        <StackItem as={"h5"} width={"150px"}>
                            Break Length
                        </StackItem>
                        <StackItem m={0}>
                            <Select defaultValue={1}>
                                <option value={1}>1 minutes</option>
                                <option value={2}>2 minutes</option>
                                <option value={3}>3 minutes</option>
                            </Select>
                        </StackItem>
                    </HStack>
                </Box>
            </Box>
        </AuthLayout>
    )
}


export default Settings