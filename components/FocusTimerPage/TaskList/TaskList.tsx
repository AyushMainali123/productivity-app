import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Skeleton, StackItem, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import Task from "./SubComponents/Task";


const INITIAL_STATE = {
    shouldShowCompletedTasks: true
}


// Pass this data to <Task /> component if the '/api/task' is in loading state
// isDummy: true makes the component to render skeletons to indicate loading of datas.
const dummyTaskListData = {
    createdAt: new Date("2022-07-18T11:16:29.867Z"),
    updatedAt: new Date("2022-07-18T11:16:29.868Z"),
    id: "test",
    taskName: "test",
    userId: "test",
    taskStatus: "ONGOING" as "ONGOING",
    breakAfter: 99,
    isDummy: true
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

            
            {/* If the tasks are in loading state, show the loading state by passing dummyTaskListData */}
            {
                !!isTaskListLoading && (
                    <VStack gap={3}>
                        {
                            Array.from({length: 5}).map((_, i) => (<Task {...dummyTaskListData} key={i} />))
                        }

                    </VStack>
                )
            }

            {/* <Task {...dummyTaskListData} /> */}
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