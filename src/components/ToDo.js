import React, { useState } from "react";

const ToDo = props => {
  const [input, setInput] = useState({
    Task: ""
  });

  const handleChanges = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitTask = e => {
    e.preventDefault();
    //
  };

  return (
    <form onSubmit={submitTask}>
      <label htmlFor="Task">Task</label>
      <input
        id="Task"
        name="Task"
        type="text"
        placeholder="Get this done"
        value={input.name}
        onChange={handleChanges}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ToDo;
