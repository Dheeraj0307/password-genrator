import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, editTodo, checkTodo } from '../features/todo/todoSlice';

// const Todos = ({ setEdit, setChangeData }) => {
const Todos = () => {
    const todos = useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();

    // const handleEdit = (todo) => {
    //     setEdit(true);
    //     setChangeData(todo);
    // };

    return (
        <div className="container">
            <div className="title">TO-DOs</div>
            {todos.length === 0 ? (
                <p className="empty-todos">No todos available</p>
            ) : (
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li className="todo-item" key={todo.id}>
                            <input type="checkbox" checked={todo.checked} onChange={() => dispatch(checkTodo(todo))} />
                            <span className="todo-text" style={todo.completed ? { textDecoration: 'line-through' } : {}}>{todo.text}</span>
                            <button
                                className="todo-button remove-btn"
                                onClick={() => dispatch(removeTodo(todo.id))}
                            >
                                X
                            </button>
                            <button
                                className="todo-button"
                                // onClick={() => handleEdit(todo)}
                                onClick={() => dispatch(editTodo({ isEdit: true, changeData: todo }))}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { Todos };