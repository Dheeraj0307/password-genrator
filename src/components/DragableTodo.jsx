import { useSelector, useDispatch } from "react-redux";
import React, { useState, useRef } from "react";
import {
  addtodo,
  removeTodo,
  updateTodo,
  editTodo,
  handleDropTodo,
  sortTodo,
} from "../features/dragabletodo/dragslice";
import "./css/drag-todo-container.css";
import { FaPencil } from "react-icons/fa6";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

const DragableTodo = () => {
  const data = useSelector((state) => state.dragTodo.dragableTodo);
  const initialTodo = {
    newInput: "",
    container: "todo",
  };

  const containerRef = useRef(null);
  const itemRef = useRef(null);

  const dispatch = useDispatch();
  const [todoInput, setTodoInput] = useState(initialTodo); // holds input and container value
  const [editValue, setEditValue] = useState("");
  const { isEdit, changeData } = useSelector((state) => state.dragTodo);

  const handleDragStart = (e, container, item) => {
    e.target.style.opacity = "0.5";
    containerRef.current = container;
    itemRef.current = item;
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleInsideDrop = (container, item) => {
    const currentIndex = data[container].indexOf(itemRef.current);
    const requiredIndex = data[container].indexOf(item);

    if (currentIndex !== -1 && requiredIndex !== -1) {
      dispatch(sortTodo({ currentIndex, requiredIndex, container }));
    }
  };

  const handleDrop = (container) => {
    const dropItem = itemRef.current;
    const dropItemContainer = containerRef.current;

    dispatch(
      handleDropTodo({
        container,
        item: dropItem,
        itemContainer: dropItemContainer,
      }),
    );
  };

  const { newInput, container } = todoInput; // destructure todoinput

  const obtainData = () => {
    const datas = [];
    const containers = Object.keys(data);
    console.log(containers);
  };

  obtainData();

  const handleSubmit = (e) => {
    const allPresentData = data[container].map((arr) => arr.text);

    if (newInput === data[container]) e.preventDefault();
    if (isEdit) {
      dispatch(updateTodo({ container, text: newInput, item: changeData }));
      dispatch(editTodo({ isEdit: false, changeData: null }));
    } else {
      dispatch(addtodo({ text: newInput, container }));
    }
    setTodoInput(initialTodo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTodoInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemove = (container, item) => {
    dispatch(removeTodo({ container, item }));
  };

  // const handleEdit = (item, container) => {
  //     setTodoInput({
  //         newInput: item.text,
  //         container
  //     })
  //     dispatch(editTodo({ isEdit: true, changeData: item }))
  // }

  // const parentStyle = (container) => {
  //     if (container === 'todo') {
  //         return {
  //             backgroundColor: '#ff3838 '
  //         }
  //     }
  //     if (container === 'progress') {
  //         return {
  //             backgroundColor: '#eeee2f '
  //         }
  //     }
  //     if (container === 'review') {
  //         return {
  //             backgroundColor: '#ffa500 '
  //         }
  //     }
  //     if (container === 'done') {
  //         return {
  //             backgroundColor: '#3fce3f '
  //         }
  //     }
  // }
  const childStyle = (container) => {
    if (container === "todo") {
      return {
        backgroundColor: "#ffaaaa ",
      };
    }
    if (container === "progress") {
      return {
        backgroundColor: "#ffffbe ",
      };
    }
    if (container === "review") {
      return {
        backgroundColor: "#ffdfa5 ",
      };
    }
    if (container === "done") {
      return {
        backgroundColor: "#b9f9b9 ",
      };
    }
  };

  const handleEditInside = (item) => {
    // handleEdit(item, container)
    setEditValue(item.text);
    dispatch(editTodo({ isEdit: true, changeData: item }));
  };

  const handleKeyPress = (e, container) => {
    console.log(e.code);
    if (e.code === "Enter") {
      let changedData = editValue;
      if (!changedData) {
        changedData = changeData.text;
      }
      dispatch(updateTodo({ container, text: changedData, item: changeData }));
      dispatch(editTodo({ isEdit: false, changeData: null }));
      setEditValue("");
    }
  };

  const handleEditOutput = (container) => {
    let changedData = editValue;
    if (!changedData) {
      changedData = changeData.text;
    }
    dispatch(updateTodo({ container, text: changedData, item: changeData }));
    dispatch(editTodo({ isEdit: false, changeData: null }));
    setEditValue("");
  };

  return (
    <div className="drag-todo-container">
      <form className="top" onSubmit={handleSubmit}>
        <input
          type="text"
          name="newInput"
          value={newInput}
          onChange={handleChange}
          required
          disabled={isEdit}
        />
        <div className="containerType">
          {Object.keys(data).map((arr, idx) => {
            return (
              <div key={idx}>
                <input
                  type="radio"
                  name="container"
                  id={arr + idx}
                  value={arr}
                  onChange={handleChange}
                  disabled={isEdit}
                  checked={container === arr}
                />
                <label htmlFor={arr + idx}>{arr}</label>
              </div>
            );
          })}
        </div>
        <button
          className="btn"
          type="submit"
          disabled={isEdit}
          style={isEdit ? { opacity: "0.5" } : { opacity: "1" }}
        >
          {" "}
          add{" "}
        </button>
      </form>

      <div className="bottom">
        {Object.keys(data).map((container, index) => {
          return (
            <div
              key={index}
              onDrop={() => (!isEdit ? handleDrop(container) : "")}
              onDragOver={(e) => e.preventDefault()}
              className="drag-container"
            >
              <div>
                {" "}
                <h2> {container}</h2> <span> ({data[container].length})</span>
              </div>
              {data[container].map((item, i) => {
                if (changeData === item) {
                  return (
                    <div
                      className="item edited-one"
                      key={i}
                      style={{
                        ...childStyle(container),
                        cursor: isEdit ? "default" : "move",
                      }}
                    >
                      <input
                        type="text"
                        value={editValue}
                        autoFocus
                        placeholder={changeData.text}
                        onKeyDown={(e) => handleKeyPress(e, container)}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <FaArrowRight
                        className="arrow"
                        onClick={() => handleEditOutput(container)}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      draggable={!isEdit}
                      onDragStart={(e) => handleDragStart(e, container, item)}
                      onDragEnd={handleDragEnd}
                      onDrop={() => handleInsideDrop(container, item)}
                      className="item"
                      style={{
                        ...childStyle(container),
                        cursor: isEdit ? "default" : "move",
                      }}
                    >
                      <p>{item.text}</p>
                      <span className="icon">
                        {/* <FaPencil size={15} onClick={() => handleEdit(item, container)} /> */}
                        <FaPencil
                          size={15}
                          onClick={() => handleEditInside(item)}
                        />
                        <IoIosRemoveCircle
                          size={20}
                          onClick={() => handleRemove(container, item)}
                        />
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { DragableTodo };
