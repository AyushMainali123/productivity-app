import { Box } from "@chakra-ui/react"
import TaskInput from "components/FocusTimerPage/TaskInput"
import TaskList from "components/FocusTimerPage/TaskList"
import AuthLayout from "components/Layouts/AuthLayout"

const FocusTime = () => {
    return (
        <AuthLayout pageTitle={"Tasks | Focus Timer"}>
            <Box as={"section"}
                maxW={"8xl"}
                m={"auto"}
                px={"10px"}
            >
                <TaskInput />
                <TaskList />
            </Box>
        </AuthLayout>
    )
}

export default FocusTime


FocusTime.requireAuth = true;