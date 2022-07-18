import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackItem, Tooltip, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { format } from 'date-fns';
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import usePomodoro from "./usePomodoro";
/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */


interface PomodoroModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

interface PomodoroCloseAlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
}

/* ----------------------------- Interface Ends ----------------------------- */


/* -------------------------------------------------------------------------- */
/*                            Sub Component Starts                            */
/* -------------------------------------------------------------------------- */

const PomodoroCloseAlertDialog = ({ isOpen, onClose, onCancel }: PomodoroCloseAlertDialogProps) => {

    const cancelRef = useRef<HTMLButtonElement>(null)


    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onCancel}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>Close the pomodoro</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Are you sure you want to stop the pomodoro? You have to start new session after the pomodoro is closed.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <HStack gap={2}>
                        <Button ref={cancelRef} onClick={onCancel}>Cancel</Button>
                        <Button onClick={onClose} colorScheme={"red"}>End session</Button>
                    </HStack>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


/* --------------------------- Sub Component Ends --------------------------- */


/* -------------------------------------------------------------------------- */
/*                           Main Component Starts                            */
/* -------------------------------------------------------------------------- */

const INITIAL_STATE = {
    isPomodoroStarted: false
}

const PomodoroModal = ({ isOpen, onClose, title }: PomodoroModalProps) => {

    const [isPomodoroStarted, setPomodoroStarted] = useState(() => INITIAL_STATE.isPomodoroStarted)

    const { isOpen: isPomodoroStopDialogOpen, onClose: onPomodoroStopDialogClose, onOpen: onPomodoroStopDialogOpen } = useDisclosure()

    const { data: userDetailsData, isLoading: isUserDetailsDataLoading, isError: isUserDetailsDataError } = useQuery<UserDetailsApiResponse>(["/api/user"])

    const { minuteCount, secondCount, setSessionPlaying } = usePomodoro({ breakTime: userDetailsData?.shortBreakLength || 5, sessionTime: userDetailsData?.pomodoroLength || 25, currentSession: "session" })


    const toast = useToast()

    const handleAlertDialogClose = () => {
        onClose();
        onPomodoroStopDialogClose();
    }


    const handlePomodoroStart = () => {
        setPomodoroStarted(true)
        setSessionPlaying(true)
    }

    const handlePomodoroStop = () => {
        setPomodoroStarted(false)
        setSessionPlaying(false)
    }


    // If userDetails fails to load, close the modal.
    if (isUserDetailsDataError) {
        
        // Close all the toasts before opening a new error toast.
        toast.closeAll();

        toast({
            title: "Error loading pomodoro details",
            position: "top-right",
            variant: "solid",
            status: "error",
            isClosable: true
        })

        // Close the modal after the toast is shown.
        onClose();
    }

    return (
        <>
            <PomodoroCloseAlertDialog
                isOpen={isPomodoroStopDialogOpen}
                onClose={handleAlertDialogClose}
                onCancel={onPomodoroStopDialogClose}
            />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent bgColor={"baseBackground"}>
                    <ModalHeader bg={"black.primary"}>
                        <Stack direction={{ base: "column", md: "row" }} justifyContent={"space-between"} gap={1}>
                            <StackItem fontWeight={"normal"} flex={1} >
                                {title}
                            </StackItem>
                            <StackItem display={"flex"} gap={1} flex={0.4} flexWrap={"wrap"} justifyContent={"flex-end"}>
                                <Icon icon={"icon-park-outline:timer"} width={22} height={22} color={"#51636E"} />
                                <Icon icon={"icon-park-outline:timer"} width={22} height={22} color={"#BEE3F8"} />
                            </StackItem>
                        </Stack>
                    </ModalHeader>
                    <ModalBody>
                        <Center
                            minH={{ base: "350", md: "400px" }}
                            margin={"auto"}
                            tabIndex={-1}
                            bgImage={{ base: "none", md: "url('/images/loginsignup/clock.png')" }}
                            backgroundPosition={"center"}
                            backgroundRepeat={"no-repeat"}
                            backgroundSize={"contain"}
                        >
                            <VStack gap={4}>
                                <StackItem>
                                    <HStack gap={1}>

                                        <StackItem
                                            bg={"black.primary"}
                                            color={"#BEE3F8"}
                                            lineHeight={1.2}
                                            px={3}
                                            py={1}
                                            fontSize={"6xl"}
                                            borderRadius={"base"}
                                        >
                                            <Skeleton isLoaded={!isUserDetailsDataLoading}>
                                                {minuteCount > 9 ? minuteCount : `0${minuteCount}`}
                                            </Skeleton>
                                        </StackItem>
                                        <StackItem>
                                            <Icon icon="entypo:dots-two-vertical" color="white" width={30} />
                                        </StackItem>
                                        <StackItem
                                            bg={"black.primary"}
                                            color={"#BEE3F8"}
                                            lineHeight={1.2}
                                            px={3}
                                            py={1}
                                            fontSize={"6xl"}
                                            borderRadius={"base"}
                                        >
                                            <Skeleton isLoaded={!isUserDetailsDataLoading}>
                                                {secondCount > 9 ? secondCount : `0${secondCount}`}
                                            </Skeleton>
                                        </StackItem>
                                    </HStack>
                                </StackItem>
                                <StackItem>
                                    <Box bg={"black.primary"} px={2} py={1} borderRadius={"md"} fontWeight={'medium'}>{format(new Date(), "EEEE, MMMM dd")}</Box>
                                </StackItem>
                            </VStack>
                        </Center>
                    </ModalBody>
                    <ModalFooter alignSelf={"center"} mb={4}>
                        <Center gap={1}>
                            {
                                !!isPomodoroStarted && (
                                    <Tooltip label={"Pause pomodoro"} hasArrow placement="top">
                                        <Button variant={"ghost"} py={3} px={3} size={"lg"} onClick={handlePomodoroStop} disabled={isUserDetailsDataLoading}>
                                            <Icon icon={"carbon:pause-future"} width={"40px"} />
                                        </Button>
                                    </Tooltip>
                                )
                            }

                            {
                                !isPomodoroStarted && (
                                    <>
                                        <Tooltip label={"Play Pomodoro"} hasArrow placement={"top"}>
                                            <Button variant={"ghost"} py={3} px={3} size={"lg"} onClick={handlePomodoroStart} disabled={isUserDetailsDataLoading}>
                                                <Icon icon={"bi:play-circle"} fontSize={"40px"} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip label={"End pomodoro"} hasArrow placement={"top"}>
                                            <Button variant={"ghost"} py={3} px={3} size={"lg"} onClick={onPomodoroStopDialogOpen} disabled={isUserDetailsDataLoading}>
                                                <Icon icon={"carbon:stop-outline"} fontSize={"47px"} />
                                            </Button>
                                        </Tooltip>
                                    </>
                                )
                            }
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PomodoroModal;