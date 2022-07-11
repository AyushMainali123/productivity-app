import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack } from "@chakra-ui/react";
import { removeTaskList } from "features/todo-slice";
import { useAppDispatch } from "hooks/redux-hook";
import { useRef } from "react";


interface TaskDeletionAlertProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}


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


export default TaskDeletionAlert;