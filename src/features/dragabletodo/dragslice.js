import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    dragableTodo: {
        pending: [
            { id: nanoid(), text: 'hello world' },
            { id: nanoid(), text: 'hello again' }
        ],
        current: [
            { id: nanoid(), text: 'hello return' },
            { id: nanoid(), text: 'hello part2' }
        ],
        completed: [
            { id: nanoid(), text: 'hello the fallen one' },
            { id: nanoid(), text: 'hello revenge' }
        ]
    },
    isEdit: false,
    changeData: null,
}

export const dragslice = createSlice({
    name: 'dragtodo',
    initialState,
    reducers: {
        addtodo: (state, action) => {
            const { container, text } = action.payload;
            const todo = {
                id: nanoid(), text
            }
            state.dragableTodo[container].push(todo)
        },
        removeTodo: (state, action) => {
            const { container, item } = action.payload;
            state.dragableTodo[container] = state.dragableTodo[container].filter((arr) => (
                arr.id !== item.id
            ))
        },
        updateTodo: (state, action) => {
            const { container, item, text } = action.payload;
            state.dragableTodo[container] = state.dragableTodo[container].map((arr) => {
                if (arr.id === item.id) {
                    return { ...arr, text }
                }
                return arr
            })
        },
        editTodo: (state, action) => {
            state.isEdit = action.payload.isEdit;
            state.changeData = action.payload.changeData
        },
        handleDropTodo: (state, action) => {
            const { container, item, itemContainer } = action.payload

            const updateSourceContainer = state.dragableTodo[itemContainer].filter((arr) => {
                return arr.id !== item.id
            })
            const updateTargetContainer = [...state.dragableTodo[container], item]
            if (container !== itemContainer) {
                state.dragableTodo = {
                    ...state.dragableTodo,
                    [itemContainer]: updateSourceContainer,
                    [container]: updateTargetContainer
                }
            }
        }

    }
})

export const { addtodo, removeTodo, updateTodo, editTodo, handleDropTodo } = dragslice.actions;
export default dragslice.reducer