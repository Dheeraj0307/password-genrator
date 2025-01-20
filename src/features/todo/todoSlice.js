import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos: [{ id: nanoid(), text: 'hello world', completed: false }],
    isEdit: false,
    changeData: null,
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const todoToUpdate = state.todos.find((todo) => todo.id === action.payload.id)
            if (todoToUpdate) {
                todoToUpdate.text = action.payload.text
            }
        },
        editTodo: (state, action) => {
            state.isEdit = action.payload.isEdit;
            state.changeData = action.payload.changeData;
        },
        checkTodo: (state, action) => {
            const checked = state.todos.find((todo) => todo.id === action.payload.id)
            if (checked) checked.completed = !checked.completed
        }
    }
})

export const { addTodo, removeTodo, updateTodo, editTodo, checkTodo } = todoSlice.actions

export default todoSlice.reducer