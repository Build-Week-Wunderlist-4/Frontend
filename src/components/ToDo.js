import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";

const ToDo = () => {
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

    // temporarily adding 1000ms to test re-occuring
    AxiosWithAuth()
      .post("api/tasks", { ...input, repeat_condition: 1000 })
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
  };

  const submitEdit = () => {
    AxiosWithAuth()
      .put(`api/tasks/${update.item_id}`, {
        name: update.updatedTask,
        is_complete: 0
      })
      .then(res => {
        window.location.reload();
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
          {/* TODO: Remove 'completed' class when 1000ms has expired */}

          <h5>Task name: {i.name}</h5>

          {update.item_id === i.id && update.is_edit ? (
            <>
              <input
                name="updatedTask"
                onChange={handleUpdate}
                value={update.updatedTask}
              />
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
          <button onClick={() => remove(i.id)}>X</button>
        </div>
      ))}
    </>
  );
};

export default ToDo;
