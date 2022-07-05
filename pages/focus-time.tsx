import { Box } from "@chakra-ui/react"
import TaskInput from "components/FocusTimerPage/TaskInput"
import TaskList from "components/FocusTimerPage/TaskList"
import AuthLayout from "components/Layouts/AuthLayout"

const FocusTime = () => {
    return (
        <AuthLayout>
            <Box as={"section"} maxW={"8xl"} m={"auto"}>
                <TaskInput />
                <TaskList />
            </Box>
        </AuthLayout>
    )
}

export default FocusTime