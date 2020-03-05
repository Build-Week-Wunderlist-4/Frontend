import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UpdateTodo from "./UpdateTodo";

const ToDo = () => {
  const history = useHistory();
  const [input, setInput] = useState({});
  const [tasks, setTasks] = useState([]);
  const [bool, setBool] = useState(true);
  const [update, setUpdate] = useState({});

  // useEffect runs AFTER the entire page loads...
  useEffect(() => {
    AxiosWithAuth()
      .get("api/tasks")
      .then(response => {
        console.log(response);
        setTasks(response.data);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, [bool]);

  const handleChanges = e => {
    setInput({
      [e.target.name]: e.target.value
    });

    console.log(input);
  };

  const handleUpdate = e => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    AxiosWithAuth()
      .post("api/tasks", input)
      .then(res => {
        setBool(!bool);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  const remove = id => {
    AxiosWithAuth()
      .delete(`api/tasks/${id}`)
      .then(res => {
        setBool(!bool);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  const removeAll = () => {
    AxiosWithAuth()
      .delete("api/tasks/deletecompleted")
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
      .put(`api/tasks/${id}`, {
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

  const editTask = id => {
    setUpdate({ is_edit: !update.is_edit, item_id: id });

    console.log(update);
  };

  const submitEdit = () => {
    AxiosWithAuth()
      .put(`api/tasks/${update.item_id}`, {
        name: update.updatedTask,
        is_complete: 0
      })
      .then(res => {
        // If successful, refresh the page
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  return (
    <>
      To Do List
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
        <div
          key={i.id}
          className={`item-list ${i.is_complete ? "completed" : null}`}
        >
          <h5>Task name: {i.name}</h5>

          {update.item_id === i.id && update.is_edit ? (
            <>
              <input name="updatedTask" onChange={handleUpdate} />
              <button onClick={submitEdit}>Update</button>
            </>
          ) : (
            ""
          )}

          <button onClick={() => editTask(i.id)}>
            {update.item_id === i.id && update.is_edit ? "cancel" : "edit"}
          </button>
          <button onClick={() => markComplete(i.id, i.is_complete)}>
            complete
          </button>
          <button onClick={() => remove(i.id)}>delete</button>
        </div>
      ))}
      <Route path="/update">
        <UpdateTodo tasks={tasks} setTasks={setTasks} />
      </Route>
    </>
  );
};

export default ToDo;
