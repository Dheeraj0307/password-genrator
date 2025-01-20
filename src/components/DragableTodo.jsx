import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useRef, useEffect } from 'react'
import { addtodo, removeTodo, updateTodo, editTodo } from '../features/dragabletodo/dragslice'
import './css/drag-todo-container.css'
import { FaPencil } from "react-icons/fa6";
import { IoIosRemoveCircle } from "react-icons/io";



const DragableTodo = () => {
    const initialValues = useSelector((state) => state.dragTodo.dragableTodo)
    const initialTodo = {
        newInput: '',
        container: 'current'
    }

    const containerRef = useRef(null)
    const itemRef = useRef(null)

    const dispatch = useDispatch();
    const [data, setData] = useState(initialValues)
    const [todoInput, setTodoInput] = useState(initialTodo);
    const { isEdit, changeData } = useSelector((state) => state.dragTodo)

    const handleDragStart = (e, container, item) => {
        e.target.style.opacity = '0.5'
        containerRef.current = container
        itemRef.current = item
    }

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1'
    }

    const handleDrop = (container) => {
        const dropItem = itemRef.current;
        const dropItemContainer = containerRef.current;
        setData(() => {
            const updatedState = { ...data };
            updatedState[dropItemContainer] = updatedState[dropItemContainer].filter((arr) => {
                return arr.id !== dropItem.id
            })
            updatedState[container] = [...updatedState[container], dropItem];

            return updatedState
        })
    }

    const containerStates = ['pending', 'current', 'completed'];

    const { newInput, container } = todoInput;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            dispatch(updateTodo({ container, text: todoInput.newInput, item: changeData }))
            dispatch(editTodo({ isEdit: false, changeData: null }))
        }
        else dispatch(addtodo({ text: newInput, container }))
        setTodoInput(initialTodo)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTodoInput((prev) => ({ ...prev, [name]: value }))
    }

    const handleRemove = (container, item) => {
        dispatch(removeTodo({ container, item }))
    }

    const handleEdit = (item, container) => {
        setTodoInput({
            newInput: item.text,
            container
        })
        dispatch(editTodo({ isEdit: true, changeData: item }))
    }

    useEffect(() => {
        setData(initialValues)
    }, [initialValues])

    return (
        <div className='drag-todo-container'>

            <form className="top" onSubmit={handleSubmit}>
                <input type="text" name='newInput' value={todoInput.newInput}
                    onChange={handleChange} required />
                <div className="containerType">

                    {Array.from(containerStates, (arr, idx) => (
                        <div key={idx}   >
                            <input type="radio" name="container" id={arr + idx} value={arr}
                                onChange={handleChange} disabled={isEdit} checked={todoInput.container === arr} />
                            <label htmlFor={arr + idx}>
                                {arr}
                            </label>
                        </div>
                    ))}
                </div>
                <button className='btn' type="submit"  >{isEdit ? 'update' : 'add'} </button>
            </form>

            <div className='bottom'>
                {Object.keys(data).map((container, index) => {
                    return <div
                        key={index}
                        onDrop={() => handleDrop(container)}
                        onDragOver={(e) => e.preventDefault()}
                        className="drag-container">
                        <h2> {container}</h2>
                        {data[container].map((item, i) => {
                            return <div
                                key={i}
                                draggable
                                onDragStart={(e) => handleDragStart(e, container, item)}
                                onDragEnd={handleDragEnd}
                                className='item'>
                                <p>{item.text}</p>
                                <span className='icon'>
                                    <FaPencil size={15} onClick={() => handleEdit(item, container)} />
                                    <IoIosRemoveCircle size={20} onClick={() => handleRemove(container, item)} />
                                </span>
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}

export { DragableTodo } 