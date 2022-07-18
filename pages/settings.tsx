import { Box, HStack, Select, Skeleton, StackItem, useToast } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import axios from "axios"
import AuthLayout from "components/Layouts/AuthLayout"
import { useMutation, useQuery, useQueryClient } from "react-query"




/* -------------------------------------------------------------------------- */
/*                              Utils Starts Here                             */
/* -------------------------------------------------------------------------- */

/**
 * * Update pomodoro length based on user changed value
 */
const updatePomodoroFn = async ({ key, value }: { key: "pomodoroLength" | "shortBreakLength" | "longBreakLength", value: number }) => {

    const response = await axios.put(`/api/user/sessions/update`, {
        [key]: value
    })

    return response;
}

/* ----------------------------- Utils Ends Here ---------------------------- */

const Settings = () => {


    const queryClient = useQueryClient()
    const { mutateAsync, isLoading: isMutatePomodoroLoading } = useMutation(updatePomodoroFn, {
        // When mutate is called:
        onMutate: async newUserDetails => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['/api/user'])

            // Snapshot the previous value
            const previousUser = queryClient.getQueryData<UserDetailsApiResponse>(['/api/user'])

            // Optimistically update to the new value
            queryClient.setQueryData<UserDetailsApiResponse>(['/api/user'], old => old && ({...old, [newUserDetails.key]: newUserDetails.value}))

            // Return a context object with the snapshotted value
            return { previousUser }
        },
        onError: (err, newnewUserDetail, context) => {
            queryClient.setQueryData(['/api/user'], context?.previousUser)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["/api/user"])
        }
    })
    const { data: currentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError } = useQuery<UserDetailsApiResponse>(["/api/user"])


    const toast = useToast({
        position: "top-right",
        variant: "solid"
    })

    if (isCurrentUserError) {
        toast({
            title: "Error loading current pomodoro details...",
            isClosable: true,
            duration: 6000
        })
    }

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
                            <Skeleton isLoaded={!isCurrentUserLoading}>
                                <Select
                                    value={currentUser?.pomodoroLength}
                                    onChange={(e) => mutateAsync({ key: "pomodoroLength", value: Number(e.target.value) })}
                                    disabled={isMutatePomodoroLoading}
                                >
                                    {
                                        Array.from({ length: 59 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num} minutes</option>)
                                    }
                                </Select>
                            </Skeleton>
                        </StackItem>
                    </HStack>
                </Box>


                {/*Short Break Length Section */}
                <Box my={7}>
                    <HStack flexWrap={"wrap"} gap={1}>
                        <StackItem as={"h5"} width={"150px"}>
                            Short Break Length
                        </StackItem>
                        <StackItem m={0}>
                            <Skeleton isLoaded={!isCurrentUserLoading}>
                                <Select
                                    value={currentUser?.shortBreakLength}
                                    onChange={(e) => mutateAsync({ key: "shortBreakLength", value: Number(e.target.value) })}
                                    disabled={isMutatePomodoroLoading}
                                >
                                    {
                                        Array.from({ length: 59 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num} minutes</option>)
                                    }
                                </Select>
                            </Skeleton>
                        </StackItem>
                    </HStack>
                </Box>


                {/*Long Break Length Section */}
                <Box my={7}>
                    <HStack flexWrap={"wrap"} gap={1}>
                        <StackItem as={"h5"} width={"150px"}>
                            Long Break Length
                        </StackItem>
                        <StackItem m={0}>
                            <Skeleton isLoaded={!isCurrentUserLoading}>
                                <Select
                                    value={currentUser?.longBreakLength}
                                    onChange={(e) => mutateAsync({ key: "longBreakLength", value: Number(e.target.value) })}
                                    disabled={isMutatePomodoroLoading}
                                >
                                    {
                                        Array.from({ length: 59 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num} minutes</option>)
                                    }
                                </Select>
                            </Skeleton>
                        </StackItem>
                    </HStack>
                </Box>
            </Box>
        </AuthLayout>
    )
}


export default Settings

Settings.requireAuth = true;