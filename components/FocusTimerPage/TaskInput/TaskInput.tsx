import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import axios from "axios"
import React, { ChangeEvent, useState } from "react"
import { useMutation, useQueryClient } from "react-query"


const INITIAL_STATE = {
    taskTitle: ""
}


/**
 *  * Function to hit api endpoint to create a new task
 */
const taskPostMutationFn = async ({ taskTitle }: { taskTitle: string }) => {
    return await axios.post("/api/task/create", {
        taskName: taskTitle
    })
}

const TaskInput = () => {


    const [taskTitle, setTaskTitle] = useState(() => INITIAL_STATE.taskTitle)
    // const dispatch = useAppDispatch()
    const queryClient = useQueryClient();

    /**
     * * Mutation hook to add a new task.
     * * Invalidates "/api/task" after succeessful query creation.
     * * isLoading indicates task is being created.
     */
    const { mutateAsync, isLoading } = useMutation(taskPostMutationFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(["/api/task"])
        }
    })

    /**
     * 
     * * Update the todo task state when the user submits the form
     * @returns 
     */
    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Terminate the function if the taskTitle is empty
        if (taskTitle.length === 0) return;

        await mutateAsync({ taskTitle })



        // Reset the form after new task is created
        setTaskTitle("")

    }


    const handleTaskTextUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <InputGroup>
                <InputLeftElement py={"25px"}>
                    <Icon icon="carbon:add" color={"rgba(255, 255, 255, 0.35)"} fontSize={24} />
                </InputLeftElement>
                <Input
                    placeholder="Add a task to “Tasks”, press [ enter ] to save"
                    py={"25px"}
                    pr={"100px"}
                    value={taskTitle}
                    onChange={handleTaskTextUpdate}
                    fontSize={{ base: "xs", md: "md" }}
                    disabled={isLoading}
                />
                <InputRightElement py={"25px"} mx={"10px"}>
                    <Button
                        type={"submit"}
                        py={4}
                        px={5}
                        mr={"40px"}
                        minW={"80px"}
                        size={"sm"}
                        fontSize={{ base: "xs", md: "md" }}
                        leftIcon={<Icon icon="fluent:arrow-enter-left-24-regular" color="white" />}
                        disabled={isLoading}
                    >
                        <span>Enter </span>
                    </Button>
                </InputRightElement>

            </InputGroup>
        </form>
    )
}

export default TaskInput;