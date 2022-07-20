import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack, Spinner } from "@chakra-ui/react";
import { ReactElement, useRef } from "react"

interface PomodoroCloseAlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
    isClosing: boolean;
}


const PomodoroCloseAlertDialog = ({ isOpen, onClose, onCancel, isClosing }: PomodoroCloseAlertDialogProps) => {

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
                <AlertDialogCloseButton disabled={isClosing} />
                <AlertDialogBody>
                    Are you sure you want to stop the pomodoro? You have to start new session after the pomodoro is closed.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <HStack gap={2}>
                        <Button ref={cancelRef} onClick={onCancel} disabled={isClosing}>Cancel</Button>
                        <Button
                            onClick={onClose}
                            colorScheme={"red"}
                            disabled={isClosing}
                            leftIcon={(isClosing ? <Spinner /> : "") as ReactElement}
                        >End session
                        </Button>
                    </HStack>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


export default PomodoroCloseAlertDialog;