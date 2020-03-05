import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import styled from "styled-components";


//styles
const Controls = styled.div `
${'' /* border: 1px dashed grey; */}
display:flex;
justify-content: space-between;
margin: 0 1% 0 1%;
`

const Task = styled.div`
${'' /* border: 1px dashed grey; */}
`
// const LogOut = styled.button `
// border: 1px dotted gray;
// width:15%;
// background: red;
// color:black;
// font-size: 30px;
// border-radius:5%;

// `

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
      ...input,
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

  return (
    <>
  
      <Controls>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">New Task </label>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="Get this done"
            value={input.name}
            onChange={handleChanges}
          />
          <button type="submit">Add</button>
        </form>
        <button onClick={removeAll}>Delete Completed Tasks</button>
      </Controls>


      <Task>
        {tasks.map(i => (
          <div className={i.is_complete ? "completed" : null}>
            <h1>{i.name}</h1>
            <button onClick={() => markComplete(i.id, i.is_complete)}>Task Completed</button>
            <button onClick={() => remove(i.id)}>Delete Task</button>
          </div>
        ))}
      </Task>
      {/* <footer>
        {localStorage.getItem("token") ? (
          <LogOut >
            Log Out
            </LogOut>
        ) : null}
      </footer> */}
    </>
  );
};

export default ToDo;
