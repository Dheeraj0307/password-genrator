import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todo/todoSlice'
import dragReducer from '../features/dragabletodo/dragslice'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        dragTodo: dragReducer
    }
})