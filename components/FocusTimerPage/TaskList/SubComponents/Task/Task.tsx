import { Box, Button, Checkbox, HStack, Menu, MenuButton, MenuItem, MenuList, StackItem, useDisclosure } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { updateTaskList } from "features/todo-slice";
import { useAppDispatch } from "hooks/redux-hook";
import { ChangeEvent, useState } from "react";
import PomodoroModal from "../PomodoroModal";
import TaskDeletionAlert from "../TaskDeletionAlert";

/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */

interface TaskProps {
    id: string;
    title: string;
    isCompleted: boolean;
}


/* ----------------------------- Interface Ends ----------------------------- */






const Task = ({ title, isCompleted, id }: TaskProps) => {

    const [isCheckboxChecked, setCheckboxChecked] = useState(() => isCompleted)

    // useDisclosure for alert modal
    const { isOpen: isDeleteModalOpen, onClose: onDeleteModalClose, onOpen: onDeleteModalOpen } = useDisclosure({
        id: "deletemodal"
    })

    const { isOpen: isPomodoroModalOpen, onClose: onPomodoroModalClose, onOpen: onPomodoroModalOpen } = useDisclosure({
        id: "pomodoromodal"
    })





    // Redux Dispatch
    const dispatch = useAppDispatch()



    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked
        setCheckboxChecked(isChecked)

        // Updating the rodolist to the current isCompleted state
        dispatch(updateTaskList({ id, isCompleted: isChecked }))
    }


    return (
        <>
            <PomodoroModal
                isOpen={isPomodoroModalOpen}
                onClose={onPomodoroModalClose}
                title={title}
            />
            <TaskDeletionAlert
                id={id}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                title={title}
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
                            <Checkbox defaultChecked={isCheckboxChecked} checked={isCheckboxChecked} onChange={handleCheckboxChange} size={"lg"} />
                        </StackItem>
                        <StackItem>
                            <Button onClick={onPomodoroModalOpen} background={"#2F4048"} py={0} height={"28px"} borderRadius={"base"} fontSize={{ base: "xs", md: "md" }}>
                                Start
                            </Button>
                        </StackItem>
                        <StackItem whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"} maxW={"50vw"}>
                            <Box textDecoration={isCompleted ? "line-through" : "initial"} fontSize={{ base: "xs", md: "md" }}>{title}</Box>
                        </StackItem>
                    </HStack>
                </StackItem>

                <StackItem>
                    <HStack gap={1}>
                        <StackItem>4hr 33min</StackItem>
                        <StackItem>
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
                        </StackItem>
                    </HStack>

                </StackItem>

            </HStack>
        </>
    )
}


export default Task

/**
 *     white-space: nowrap;
    overflow: hidden;
    max-width: 50vw;
    text-overflow: ellipsis;
 */