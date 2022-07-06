import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Checkbox, HStack, Menu, MenuButton, MenuItem, MenuList, StackItem, useDisclosure } from "@chakra-ui/react"
import { Icon } from "@iconify/react";
import { removeTaskList, updateTaskList } from "features/todo-slice";
import { useAppDispatch } from "hooks/redux-hook";
import { ChangeEvent, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */

interface TaskProps {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface TaskDeletionAlertProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}


/* ----------------------------- Interface Ends ----------------------------- */




/* -------------------------------------------------------------------------- */
/*                            Sub Component Starts                            */
/* -------------------------------------------------------------------------- */

const TaskDeletionAlert = ({ id, onClose, isOpen, title }: TaskDeletionAlertProps) => {

    const cancelRef = useRef<HTMLButtonElement>(null)

    // Redux Dispatch
    const dispatch = useAppDispatch()

    const handleTaskDeletion = (id: string) => {
        dispatch(removeTaskList({ id }))
        onClose();
    }


    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>Delete Task?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Are you sure you want to delete the task {`"${title}"`}? This action cannot be reverted.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <HStack gap={2}>
                        <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
                        <Button onClick={() => handleTaskDeletion(id)} colorScheme={"red"}>Delete task</Button>
                    </HStack>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}


/* --------------------------- Sub Component Ends --------------------------- */

const Task = ({ title, isCompleted, id }: TaskProps) => {

    const [isCheckboxChecked, setCheckboxChecked] = useState(() => isCompleted)
    const { isOpen, onClose, onOpen } = useDisclosure()

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
            <TaskDeletionAlert
                id={id}
                isOpen={isOpen}
                onClose={onClose}
                title={title}
            />
            <HStack
                width={"100%"}
                bg={"black.secondary"}
                px={"12px"}
                py={"10px"}
                borderRadius={{base: "none", lg: "base" }}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <StackItem>
                    <HStack gap={{base: 1, md: 4}}>
                        <StackItem display={"flex"}>
                            <Checkbox defaultChecked={isCheckboxChecked} checked={isCheckboxChecked} onChange={handleCheckboxChange} size={"lg"} />
                        </StackItem>
                        <StackItem>
                            <Button background={"#2F4048"} py={0} height={"28px"} borderRadius={"base"} fontSize={{ base: "xs", md: "md" }}>
                                Start
                            </Button>
                        </StackItem>
                        <StackItem>
                            <Box textDecoration={isCompleted ? "line-through" : "initial"} fontSize={{base: "xs", md: "md"}}>{title}</Box>
                        </StackItem>
                    </HStack>
                </StackItem>

                <StackItem>
                    <Menu >
                        <MenuButton as={Button} variant={"ghost"} height={"30px"}>
                            <Icon icon="bx:dots-vertical-rounded" fontSize={"16px"} />
                        </MenuButton>
                        <MenuList bg={"black.primary"}>
                            <MenuItem onClick={() => onOpen()}>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </StackItem>

            </HStack>
        </>
    )
}


export default Task