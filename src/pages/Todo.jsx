import React, { useState } from "react";
import AddTodo from "../components/AddTodo";
import { Todos } from "../components/Todos";

const Todo = () => {
  const [edit, setEdit] = useState(false);
  const [changeData, setChangeData] = useState();

  return (
    <div className="box">
      <div className="todo-ctn">
        <h2>hello</h2>
        <AddTodo edit={edit} setEdit={setEdit} changeData={changeData} />
        <Todos setEdit={setEdit} setChangeData={setChangeData} />
      </div>
    </div>
  );
};

export default Todo;
