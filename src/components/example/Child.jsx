import React from "react";

const Child = ({ greatings, value }) => {
  console.log("child renders");

  const click = () => {
    console.log("hello world!");
  };

  return (
    <div>
      This is Child Component
      <button onClick={click}> hit</button>
      <button onClick={greatings}> greatings</button>
      <button onClick={value}> math</button>
    </div>
  );
};

export default Child;
