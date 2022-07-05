import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SingleTodo {    
    id: string,
    title: string,
    isCompleted: boolean
}

interface TodoState { 
    todos: SingleTodo[] 
}

const initialState: TodoState = {
    todos:  [
        {
            id: "1",
            title: "Task One",
            isCompleted: true
        },
        {
            id: "2",
            title: "Task two",
            isCompleted: false
        },
        {
            id: "3",
            title: "Task three",
            isCompleted: false
        },
        {
            id: "4",
            title: "Task four",
            isCompleted: true
        },
    ]
}


export const todosSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTaskList: (state, action: PayloadAction<{title: string}>) => {
            state.todos.push({title: action.payload.title, isCompleted: false, id: (Math.floor(Math.random() * 10_000)).toString()})
        },
        removeTaskList: (state, action: PayloadAction<{id: string}>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id )
        },
        updateTaskList : (state, action: PayloadAction<{id: string, isCompleted: boolean}>) => {
           state.todos =  state.todos.map(todo => todo.id === action.payload.id ? ({...todo, isCompleted: action.payload.isCompleted}): todo)
        }
    }

})


export const { addTaskList, removeTaskList, updateTaskList } = todosSlice.actions
export default todosSlice.reducer