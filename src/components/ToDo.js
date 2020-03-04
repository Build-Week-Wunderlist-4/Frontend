import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";

const ToDo = () => {
  const [input, setInput] = useState({});

  const [tasks, setTasks] = useState([]);

  const [bool, setBool] = useState(true);

  useEffect(() => {
    AxiosWithAuth()
      .get("https://wunderlistbuild.herokuapp.com/api/tasks")
      .then(res => {
        setTasks(res.data);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, [bool]);

  const handleChanges = e => {
    setInput({
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    AxiosWithAuth()
      .post("https://wunderlistbuild.herokuapp.com/api/tasks", input)
      .then(res => {
        setBool(!bool);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  const remove = id => {
    AxiosWithAuth()
      .delete(`https://wunderlistbuild.herokuapp.com/api/tasks/${id}`)
      .then(res => {
        setBool(!bool);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  const removeAll = () => {
    AxiosWithAuth()
      .delete(`https://wunderlistbuild.herokuapp.com/api/tasks/deletecompleted`)
      .then(res => {
        // console.log(res);
        setBool(!bool);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  const markComplete = (id, status) => {
    AxiosWithAuth()
      .put(`https://wunderlistbuild.herokuapp.com/api/tasks/${id}`, {
        is_complete: !status
      })
      .then(res => {
        console.log(res);
        setBool(!bool);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Task</label>
        <input
          id="name"
          name="name"
          type="name"
          placeholder="Get this done"
          value={input.name}
          onChange={handleChanges}
        />

        <button type="submit">Submit</button>
        <button onClick={removeAll}>Delete Completed</button>
      </form>

      {tasks.map(i => (
        <div className={i.is_complete ? "completed" : null}>
          <h1>{i.name}</h1>
          <button onClick={() => markComplete(i.id, i.is_complete)}>complete</button>
          <button onClick={() => remove(i.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default ToDo;
