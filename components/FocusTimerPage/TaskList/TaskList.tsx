import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Skeleton, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import Task from "./SubComponents/Task";


const INITIAL_STATE = {
    shouldShowCompletedTasks: true
}


const TaskList = () => {


    const [shouldShowCompletedTasks, setShouldShowCompletedTasks] = useState(INITIAL_STATE.shouldShowCompletedTasks)

    const { data: taskListsData, isLoading: isTaskListLoading, isError: isTaskListError } = useQuery<TaskListApiResponse>(['/api/task'])



    if (isTaskListError) {
        return (
            <Alert status='error' mt={4} variant={"top-accent"}>
                <AlertIcon />
                <AlertTitle>There was a problem processing your request</AlertTitle>
                <AlertDescription>Couldnot load tasklists.</AlertDescription>
            </Alert>
        )
    }


    return (
        <Box mt={{ base: "20px", md: "30px", lg: "60px" }}>
            <Box as={"h4"} fontSize={"md"} fontWeight={"medium"} mb={{ base: "12px", md: "16px", lg: "20px" }} ml={{ base: "12px", md: 0 }}>TASKS</Box>

            {
                !!isTaskListLoading && (
                    <>
                        <Skeleton height={"50px"} borderRadius={{ base: "none", lg: "base" }} mb={3} />
                        <Skeleton height={"50px"} borderRadius={{ base: "none", lg: "base" }} mb={3} />
                        <Skeleton height={"50px"} borderRadius={{ base: "none", lg: "base" }} mb={3} />
                        <Skeleton height={"50px"} borderRadius={{ base: "none", lg: "base" }} mb={3} />
                    </>
                )
            }

            {/* If all the tasks are completed: Show this message */}
            {
                (taskListsData?.onGoingTaskList.length === 0 && (
                    <Box>Horray!! You have no task left. Do add the task if you have more tasks in queue.</Box>
                ))
            }


            {/* Show ongoing tasks */}
            <VStack gap={3}>
                {
                    taskListsData?.onGoingTaskList.map((task) => (<Task {...task} key={task.id} />))
                }
            </VStack>


            {/* Button to toggle show/hide completed tasks */}
            {/* Show this button only if the user has completed atleast one task*/}
            {
                !!taskListsData?.completedTaskList.length && (
                    <Button
                        mx={"auto"}
                        h={"30px"}
                        my={{ base: "20px", md: "30px", lg: "40px" }}
                        display={"block"}
                        bg={"black.secondary"}
                        onClick={() => setShouldShowCompletedTasks(prev => !prev)}
                        fontSize={{ base: "xs", lg: "md" }}
                    >
                        {shouldShowCompletedTasks ? "Hide" : "Show"} completed tasks
                    </Button>
                )
            }
           

            {/* Show completed tasks if the "shouldShowCompletedTasks" is true */}
            {
                !!shouldShowCompletedTasks && (
                    <VStack gap={3}>
                        {
                            taskListsData?.completedTaskList.map((task) => (<Task {...task} key={task.id} />))
                        }
                    </VStack>
                )
            }

        </Box>
    )
}

export default TaskList;