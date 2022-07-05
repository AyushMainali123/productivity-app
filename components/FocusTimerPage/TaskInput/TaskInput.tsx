import { Button, Input, InputGroup, InputLeftElement, InputRightElement, VisuallyHidden } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { addTaskList } from "features/todo-slice"
import { useAppDispatch } from "hooks/redux-hook"
import React, { ChangeEvent, useState } from "react"


const INITIAL_STATE = {
    taskTitle: ""
}

const TaskInput = () => {


    const [taskTitle, setTaskTitle] = useState(() => INITIAL_STATE.taskTitle)
    const dispatch = useAppDispatch()


    /**
     * 
     * * Update the todo task state when the user submits the form
     * @returns 
     */
    const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Terminate the function if the taskTitle is empty
        if (taskTitle.length === 0) return;


        // Add the new task to the section
        dispatch(addTaskList({ title: taskTitle }))

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
                    bg={"black.secondary"}
                    py={"25px"}
                    pr={"100px"}
                    value={taskTitle}
                    onChange={handleTaskTextUpdate}

                />
                <InputRightElement py={"25px"} mx={"10px"}>
                    <Button type={"submit"} py={"10px"} px={"20px"} mr={"40px"} minW={"70px"} height={"30px"}>
                        <span>Enter </span>
                    </Button>
                </InputRightElement>

            </InputGroup>
            {/* <VisuallyHidden> */}

            {/* </VisuallyHidden> */}
        </form>
    )
}

export default TaskInput;