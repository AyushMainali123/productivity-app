import { Badge, Box, Button, Center, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackItem, Tooltip, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { SessionEntity, WorkSession } from "@prisma/client";
import { format } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTotalCompletedPercentage } from "utils/getTotalCompletedPercentage";
import PomodoroCloseAlertDialog from "../PomodoroCloseAlertDialog";
import { createSessionEntityMutationFn, createWorkSessionMutationFn, endWorkSessionMutationFn, getNextSession, stopSessionEntityMutationFn } from "./PomodoroModal.utils";
import usePomodoro from "./usePomodoro";
/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */

interface PomodoroModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    taskId: string;
}

/* ----------------------------- Interface Ends ----------------------------- */



/* -------------------------------------------------------------------------- */
/*                           Main Component Starts                            */
/* -------------------------------------------------------------------------- */

const INITIAL_STATE = {
    isPomodoroStarted: false
}

const PomodoroModal = ({ isOpen, onClose, title, taskId }: PomodoroModalProps) => {

    // Track if the pomodoro is started
    const [isPomodoroStarted, setPomodoroStarted] = useState(() => INITIAL_STATE.isPomodoroStarted)

    // Initialising audio and saving it on cache
    const audio = useMemo(() => new Audio("/music/pomodoro-alarm.wav"), [])

    // Hook to initialise toast.
    const toast = useToast({
        position: "top-right",
        variant: "solid"
    })

    // This reference tracks if the pomodoro is rendered first time
    const isRenderedFirstTime = useRef(true);

    // This reference tracks ongoing pomodoro session
    const onGoingSession = useRef<WorkSession | null>(null);

    // This reference tracks current session entity
    const currentSessionEntity = useRef<SessionEntity | null>(null);

    // hook to get current query client instance
    const queryClient = useQueryClient();

    // Hook to handle pomodoro stop dialog
    const {
        isOpen: isPomodoroStopDialogOpen,
        onClose: onPomodoroStopDialogClose,
        onOpen: onPomodoroStopDialogOpen
    } = useDisclosure()


    // Hook to get user data
    const {
        data: userDetailsData,
        isLoading: isUserDetailsDataLoading,
        isError: isUserDetailsDataError
    } = useQuery<UserDetailsApiResponse>(["/api/user"])


    // hook to handle pomodoro
    const {
        minuteCount,
        secondCount,
        setSessionPlaying,
        isCurrentSessionCompleted,
        setCurrentPomodoroSession,
        setCurrentSessionCompleted,
        setShortBreakTime,
        setLongBreakTime,
        setSessionTime,
        currentPomodoroSession
    } = usePomodoro()

    const {
        data: taskDetailsData,
        isLoading: isTaskDetailsLoading,
        isError: isTaskDetailsError
    } = useQuery<TaskListSingleTask>([`/api/task/${taskId}`])



    const {
        mutateAsync: createWorkSessionMutateAsync,
        isLoading: isCreatingWorkSession
    } = useMutation(createWorkSessionMutationFn, {
        // After the mutation is completed, this function is executed at the top priority.
        onSuccess: (data) => {
            onGoingSession.current = data.data;
            queryClient.invalidateQueries([`/api/task/${taskId}`])
        },
        onError: (error: { message: string }) => {
            toast({
                title: error.message || "Failed to start the session. This session will not be saved",
                status: "error"
            })
        }
    });


    const {
        mutateAsync: createSessionEntityMutateAsync,
        isLoading: isCreatingSessionEntity
    } = useMutation(createSessionEntityMutationFn, {
        // After the mutation is completed, this function is executed at the top priority.
        onSuccess: (data) => {
            currentSessionEntity.current = data.data;
            queryClient.invalidateQueries([`/api/task/${taskId}`])
        }
    })


    const {
        mutateAsync: stopSessionEntityMutateAsync,
        isLoading: isStoppingSessionEntity
    } = useMutation(stopSessionEntityMutationFn, {
        onSuccess: (data) => {
            currentSessionEntity.current = data.data;
            queryClient.invalidateQueries([`/api/task/${taskId}`])
        }
    })


    const { mutateAsync: endWorkSessionMutateAsync, isLoading: isEndingWorkSession } = useMutation(endWorkSessionMutationFn, {
        onSuccess: (data) => {
            onGoingSession.current = data.data;
            queryClient.invalidateQueries([`/api/task/${taskId}`])
            queryClient.invalidateQueries([`/api/task`]);
        },
        onError: (error: {message: string}) => {
            toast({
                title: error.message || "Couldnot end session. Unfortunately this session cannot be saved",
                status: "error"
            })
        }
    })


    // After retriving userDetailsData, update sessionTime, longBreak, shortBreak
    useEffect(() => {
        if (!userDetailsData) return;
        setSessionTime(userDetailsData?.pomodoroLength)
        setLongBreakTime(userDetailsData.longBreakLength)
        setShortBreakTime(userDetailsData.shortBreakLength)
    }, [userDetailsData, setLongBreakTime, setShortBreakTime, setSessionTime])


    // Call this effect as soon as the session is changed
    useEffect(() => {

        // Function to call after isCurrentSessionCompleted updates.
        const handleSessionCompleted = async () => {


            // If the current session is not present or session is not completed. terminate the effect here
            if (!onGoingSession.current || !isCurrentSessionCompleted) return;


            if (isCurrentSessionCompleted) {

                // Perform operations and call endpoints in this section

                // Set the current session to not completed
                setCurrentSessionCompleted(false)
                
                // Play the audio to let user know current session is completed
                audio.play()


                // This is the time, new session is started
                const timeStart = new Date()

                // Setting usePomodoro hook sessiontype
                const currentSession = onGoingSession.current.sessionType
                const nextLongBreak = taskDetailsData?.longBreakAfter as number

                const nextSession = getNextSession(currentSession, nextLongBreak)

                setCurrentPomodoroSession(nextSession)


                // Stop the entity here
                await stopSessionEntityMutateAsync({
                    entityId: currentSessionEntity.current?.id || "",
                    sessionId: onGoingSession.current?.id || "",
                    timeEnd: timeStart  // Stop the timer when the session is ended by default
                })

                // End the current session here
                await endWorkSessionMutateAsync({
                    isSessionCompleted: true,
                    sessionId: onGoingSession.current?.id || ""
                })


                // Start the new session here
                await createWorkSessionMutateAsync({
                    sessionType: nextSession,
                    isSessionStarted: true,
                    taskId
                })

                // Start the new session entity here
                await createSessionEntityMutateAsync({
                    sessionId: onGoingSession.current.id,
                    timeStart
                })

            }
        }

        handleSessionCompleted();


    }, [
        isCurrentSessionCompleted,
        setCurrentSessionCompleted,
        endWorkSessionMutateAsync,
        setCurrentPomodoroSession,
        taskDetailsData?.longBreakAfter,
        createSessionEntityMutateAsync,
        createWorkSessionMutateAsync,
        stopSessionEntityMutateAsync,
        taskId,
        audio
    ])


    /**
     * * This function runs when the user closes the modal
     * * This function plays the pomodoro timer and calls all the required api endpoints
     */
    const handleAlertDialogClose = async () => {



        // If the session is not started end the pomodoro
        if (!onGoingSession.current) {
            onClose();
            onPomodoroStopDialogClose();
            return;
        }

        await endWorkSessionMutateAsync({
            isSessionCompleted: false,
            sessionId: onGoingSession.current?.id || "",
            taskId
        })


        // Close the alert dialog after api calls
        onClose();
        onPomodoroStopDialogClose();
    }

    /**
     * * This function runs when the user clicks the play button
     * * This function plays the pomodoro timer and calls all the required api endpoints
     */
    const handlePomodoroStart = async () => {

        setPomodoroStarted(true)
        setSessionPlaying(true)


        // This is the time, play button was clicked.
        const startTime = new Date();


        // If play button was created for the first time, create a work session.
        if (isRenderedFirstTime.current) {

            isRenderedFirstTime.current = false;

            await createWorkSessionMutateAsync({
                sessionType: "WORK_SESSION",
                taskId,
                isSessionStarted: true
            })

        }

        await createSessionEntityMutateAsync({
            sessionId: onGoingSession.current?.id || "",
            timeStart: startTime
        })


    }

    /**
     * * This function runs when the user clicks the pause button
     * * This function pauses the pomodoro timer and calls all the required api endpoints
     */
    const handlePomodoroStop = async () => {
        setPomodoroStarted(false)
        setSessionPlaying(false)


        // This is the time, pause button was clicked.
        const timeEnd = new Date();


        await stopSessionEntityMutateAsync({
            entityId: currentSessionEntity.current?.id || "",
            sessionId: onGoingSession.current?.id || "",
            timeEnd
        })


    }


    // If userDetails or taskDetails fails to load, close the modal.
    if (isUserDetailsDataError || isTaskDetailsError) {

        // Close all the toasts before opening a new error toast.
        toast.closeAll();

        toast({
            title: "Error loading pomodoro details",
            status: "error",
            isClosable: true
        })

        // Close the modal after the toast is shown.
        onClose();
    }


    return (
        <>
            {/* Pomodoro force close alert dialog */}
            <PomodoroCloseAlertDialog
                isOpen={isPomodoroStopDialogOpen}
                onClose={handleAlertDialogClose}
                onCancel={onPomodoroStopDialogClose}
                isClosing={isEndingWorkSession}
      
            />

            {/* Main Pomodoro modal starts */}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent bgColor={"baseBackground"}>

                    {/* Pomodoro top header */}
                    <ModalHeader bg={"black.primary"}>
                        <Stack direction={{ base: "column", md: "row" }} justifyContent={"space-between"} gap={1}>
                            <StackItem fontWeight={"normal"} flex={1} >
                                {title}
                            </StackItem>
                            <StackItem display={"flex"} gap={1} flex={0.4} flexWrap={"wrap"} justifyContent={"flex-end"}>
                                <Skeleton isLoaded={!isTaskDetailsLoading} >
                                    <HStack >
                                        <StackItem fontWeight={"light"} fontSize={"md"}>
                                            {getTotalCompletedPercentage(taskDetailsData?.workSession || [])}
                                        </StackItem>
                                        <StackItem>
                                            <Icon
                                                icon={"icon-park-outline:timer"}
                                                width={22}
                                                height={22}
                                                color={"#BEE3F8"}
                                            />
                                        </StackItem>
                                    </HStack>

                                </Skeleton>
                            </StackItem>
                        </Stack>
                    </ModalHeader>

                    {/* Main Pomodoro bosy */}
                    <ModalBody>
                        <Badge colorScheme={"black"} variant='subtle'>
                            {currentPomodoroSession.replace("_", " ")}
                        </Badge>
                        <Center
                            minH={{ base: "250px", md: "400px" }}
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

                    {/* Pomodoro footer */}
                    <ModalFooter alignSelf={"center"} mb={4}>
                        <Center gap={1}>
                            {
                                !!isPomodoroStarted && (
                                    <Tooltip label={"Pause pomodoro"} hasArrow placement="top">
                                        <Button variant={"ghost"} py={3} px={3} size={"lg"} onClick={handlePomodoroStop} disabled={isUserDetailsDataLoading || isCreatingWorkSession || isCreatingSessionEntity}>
                                            <Icon icon={"carbon:pause-future"} width={"40px"} />
                                        </Button>
                                    </Tooltip>
                                )
                            }

                            {
                                !isPomodoroStarted && (
                                    <>
                                        <Tooltip label={"Play Pomodoro"} hasArrow placement={"top"}>
                                            <Button variant={"ghost"} py={3} px={3} size={"lg"} onClick={handlePomodoroStart} disabled={isUserDetailsDataLoading || isStoppingSessionEntity}>
                                                <Icon icon={"bi:play-circle"} fontSize={"40px"} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip label={"End pomodoro"} hasArrow placement={"top"}>
                                            <Button variant={"ghost"} py={3} px={3} size={"lg"} onClick={onPomodoroStopDialogOpen} disabled={isUserDetailsDataLoading || isStoppingSessionEntity}>
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