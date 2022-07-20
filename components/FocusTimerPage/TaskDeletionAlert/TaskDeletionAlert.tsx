import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";


interface TaskDeletionAlertProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}


const deleteTaskMutationFn = ({ id }: { id: string }) => {
    return axios.delete(`/api/task/delete/${id}`)
}


const TaskDeletionAlert = ({ id, onClose, isOpen, title }: TaskDeletionAlertProps) => {

    const cancelRef = useRef<HTMLButtonElement>(null)
    const queryClient = useQueryClient();
    const toast = useToast({
        position: "top-right",
        variant: "solid",
        duration: null
    });


    /**
     * * Hook to delete the task having taskId -> id
     * * After successfull deletion, invalidates the '/api/task' endpoint
     */
    const { mutateAsync } = useMutation(deleteTaskMutationFn, {
        onMutate: () => {
            toast({
                title: `Deleting task`,
                status: "loading"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['/api/task'])

            // Close all the toasts before opening the success toast
            toast.closeAll();
            toast({
                title: "Successfully deleted task",
                status: "success",
                duration: 3000
            })
        },

        onError: (error: {message: string}) => {
            toast.closeAll();
            toast({
                title: error?.message || "Couldnot delete the task",
                status: "error",
                duration: 3000
            })
        }
    }

    )

    // Redux Dispatch
    // const dispatch = useAppDispatch()

    const handleTaskDeletion = (id: string) => {
        // dispatch(removeTaskList({ id }))
        mutateAsync({ id })
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