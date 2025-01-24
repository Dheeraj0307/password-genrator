import React, { useCallback, useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [counter, setCounter] = useState(0);

  const greatings = () => {
    console.log("hello my friend"); // simple function only console nothing more and this will not re-render page
  };

  const someMath = () => {
    const array = [1, 2, 3, 4, 5].map((arr) => arr + 1); // on the other hand this will also no re-render page

    console.log(array);
  };

  const message = useCallback(() => {
    setTimeout(() => {
      setCounter((prev) => prev + 1);
    }, 100);
  }, []);

  console.log("parent Renders");

  return (
    <div>
      {counter}

      <button onClick={message}>timer</button>

      <Child greatings={greatings} value={someMath} />
    </div>
  );
};

export default Parent;
