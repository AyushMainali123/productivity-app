import { Box, Button, VStack } from "@chakra-ui/react"
import { useAppSelector } from "hooks/redux-hook";
import { useState } from "react";
import Task from "./SubComponents/Task";


const INITIAL_STATE = {
    shouldShowCompletedTasks: true
}

const TaskList = () => {


    const [shouldShowCompletedTasks, setShouldShowCompletedTasks] = useState(INITIAL_STATE.shouldShowCompletedTasks)
    const taskLists = useAppSelector((state) => state.todos.todos)


    return (
        <Box mt={{ base: "20px", md: "30px", lg: "60px" }}>
            <Box as={"h4"} fontSize={"md"} fontWeight={"medium"} mb={{ base: "12px", md: "16px", lg: "20px" }} ml={{base: "12px", md: 0}}>TASKS</Box>
            {
                (taskLists.every(task => task.isCompleted === true)) && (
                    <Box>Horray!! You have no task left. Do add the task if you have more tasks in queue.</Box>
                )
            }
            <VStack gap={3}>
                {
                    taskLists.map((task) => (!task.isCompleted && <Task {...task} key={task.id}  />))
                }
            </VStack>
            <Button
                mx={"auto"}
                h={"30px"}
                my={{ base: "20px", md: "30px", lg: "40px" }}
                display={"block"}
                bg={"black.secondary"}
                onClick={() => setShouldShowCompletedTasks(prev => !prev)}
                fontSize={{base: "xs", lg: "md"}}
            >
                {shouldShowCompletedTasks ? "Hide" : "Show"} completed tasks
            </Button>



            {/* Show completed tasks if the "shouldShowCompletedTasks" is true */}
            {
                !!shouldShowCompletedTasks && (
                    <VStack gap={3}>
                        {
                            taskLists.map((task) => (task.isCompleted && <Task {...task} key={task.id}  />))
                        }
                    </VStack>
                )
            }

        </Box>
    )
}

export default TaskList;