import React from "react";
import "./App.css";
// import PasswordGenrator from './components/PasswordGenrator';
// import AddTodo from './components/AddTodo'
// import { Todos } from './components/Todos';
import { DragableTodo } from "./components/DragableTodo";
import { Query } from "./components/Query";

function App() {
  return (
    <div className="main-container">
      {/* <PasswordGenrator /> */}
      {/* <div className='todo-container'>
        <AddTodo />
        <Todos />
      </div> */}

      {/* <DragableTodo /> */}

      <Query />
    </div>
  );
}

export default App;
