import { Box, Button, Checkbox, HStack, Menu, MenuButton, MenuItem, MenuList, Skeleton, StackItem, useDisclosure, useToast } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import PomodoroModal from "../PomodoroModal";
import TaskDeletionAlert from "../TaskDeletionAlert";
import { getTotalCompletedPercentage } from "./Task.utils";

/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */


// isDummy: true indicates the component is loading. Thus, renders skeleton to show loading state.
interface TaskProps extends TaskListSingleTask {
    isDummy?: boolean;
}



/* ----------------------------- Interface Ends ----------------------------- */


/* -------------------------------------------------------------------------- */
/*                                Utils Starts                                */
/* -------------------------------------------------------------------------- */

/**
 * * This function sends api to update task status
 * * The task status can be "COMPLETED" OR "ONGOING"
 */
const updateTaskStatusFn = ({ id, taskStatus }: { id: string, taskStatus: "COMPLETED" | "ONGOING" }) => {
    return axios.put(`/api/task/update/status/${id}`, { taskStatus })
}

/* ------------------------------- Utils Ends ------------------------------- */



const Task = ({ taskName, taskStatus, id, isDummy, workSession }: TaskProps) => {

    const [isCheckboxChecked, setCheckboxChecked] = useState(() => taskStatus === "COMPLETED")
    const toast = useToast({
        position: "top-right",
        variant: "solid",
        duration: null
    })
    // useDisclosure for alert modal
    const { isOpen: isDeleteModalOpen, onClose: onDeleteModalClose, onOpen: onDeleteModalOpen } = useDisclosure({
        id: "deletemodal"
    })

    const { isOpen: isPomodoroModalOpen, onClose: onPomodoroModalClose, onOpen: onPomodoroModalOpen } = useDisclosure({
        id: "pomodoromodal"
    })


    /**
     *  * Mutation hook to update task status
     *  * After successfull update, '/api/task' is invalidated.
     */
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation(updateTaskStatusFn, {

        onMutate: () => {
            toast({
                title: "Updating task. Please wait",
                status: "info"
            })
        },
        onError: (error: { message: string }) => {
            toast.closeAll();
            toast({
                title: error.message,
                status: "error",
                duration: 3000
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["/api/task"])
            toast.closeAll();
            toast({
                title: "Successfully updated task",
                status: "success",
                duration: 3000
            })
        }
    })


    const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked
        setCheckboxChecked(isChecked)
        const taskStatus = isChecked ? "COMPLETED" : "ONGOING"

        await mutateAsync({ id, taskStatus })

    }

    return (
        <>
            {
                !!isPomodoroModalOpen && (
                    <PomodoroModal
                        isOpen={isPomodoroModalOpen}
                        onClose={onPomodoroModalClose}
                        title={taskName}
                        taskId={id}
                    />
                )
            }

            <TaskDeletionAlert
                id={id}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                title={taskName}
            />
            <HStack
                width={"100%"}
                bg={"black.secondary"}
                px={"12px"}
                py={"10px"}
                borderRadius={{ base: "none", lg: "base" }}
                alignItems={"center"}
                justifyContent={"space-between"}
            >

                <StackItem>
                    <HStack gap={{ base: 1, md: 4 }}>
                        <StackItem display={"flex"}>
                            <Skeleton isLoaded={!isDummy}>
                                <Checkbox defaultChecked={isCheckboxChecked} checked={isCheckboxChecked} onChange={handleCheckboxChange} size={"lg"} mt={"2px"} />
                            </Skeleton>
                        </StackItem>
                        <StackItem>
                            <Skeleton isLoaded={!isDummy}>
                                <Button onClick={onPomodoroModalOpen} background={"#2F4048"} py={0} height={"28px"} borderRadius={"base"} fontSize={{ base: "xs", md: "md" }}>
                                    Start
                                </Button>
                            </Skeleton>
                        </StackItem>
                        <StackItem whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"} maxW={"50vw"}>

                            <Skeleton isLoaded={!isDummy}>
                                <Box textDecoration={isCheckboxChecked ? "line-through" : "initial"} fontSize={{ base: "xs", md: "md" }}>{taskName}</Box>
                            </Skeleton>
                        </StackItem>
                    </HStack>
                </StackItem>

                <StackItem>
                    <HStack gap={1}>
                        <StackItem>
                            {/* Type One of showing data*/}
                            {/* This is commented for now and typew two is shown */}
                            {/* {
                                            workSession.map((session, index) => (
                                                <Icon icon={"icon-park-outline:timer"} width={22} height={22} opacity={session.isSessionCompleted ? 1 : 0.4} color={"#fff"} key={index} />
                                            ))
                                        } */}

                            {/* Type Two of showing data */}
                            <HStack alignItems={"center"} mt={1}>
                                <StackItem>
                                    <Skeleton isLoaded={!isDummy}>
                                        {getTotalCompletedPercentage(workSession)}
                                    </Skeleton>
                                </StackItem>
                                <StackItem mb={"1px"}>
                                    <Icon icon={"icon-park-outline:timer"} width={22} height={22} color={"#fff"} />
                                </StackItem>
                            </HStack>
                        </StackItem>
                        <StackItem>
                            <Skeleton isLoaded={!isDummy}>
                                <Menu>
                                    <MenuButton as={Button} variant={"ghost"} height={"30px"}>
                                        <Icon icon="bx:dots-vertical-rounded" fontSize={"16px"} />
                                    </MenuButton>
                                    <MenuList bg={"black.primary"}>
                                        <MenuItem onClick={() => onDeleteModalOpen()} fontSize={{ base: "xs", md: "md" }}>
                                            Delete
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Skeleton>
                        </StackItem>
                    </HStack>

                </StackItem>

            </HStack>
        </>
    )
}


export default Task
