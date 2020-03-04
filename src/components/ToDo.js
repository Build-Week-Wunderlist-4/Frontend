import React, { useState } from "react";

const ToDo = () => {
  const [input, setInput] = useState({
    task: ""
  });

  const handleChanges = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Task</label>
      <input
        id="task"
        name="task"
        type="text"
        placeholder="Get this done"
        value={input.name}
        onChange={handleChanges}
      />

      <button>Submit</button>
    </form>
  );
};

export default ToDo;
