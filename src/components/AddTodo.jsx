import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, updateTodo } from "../features/todo/todoSlice";

// const AddTodo = ({ edit, setEdit, changeData }) => {
const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { isEdit, changeData, todos } = useSelector((state) => state.todo);

  console.log(todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (edit) {
    //     dispatch(updateTodo({ ...changeData, text: input }));
    //     setEdit(false);
    if (isEdit) {
      dispatch(updateTodo({ ...changeData, text: input }));
      dispatch(editTodo({ edit: false, changeData: null }));
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  };

  useEffect(() => {
    if (isEdit && changeData) {
      setInput(changeData.text);
    }
  }, [isEdit, changeData]);

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        className="add-todo-input"
        type="text"
        placeholder="Add a todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <div className="btn-holder">
        {input.length ? (
          <button className="add-todo-submit" type="submit">
            {isEdit ? "Update" : "Add"}
          </button>
        ) : (
          <></>
        )}

        {/* {isEdit ? <button className='add-todo-submit'>Back</button> : <></>} */}
      </div>
    </form>
  );
};

export default AddTodo;
