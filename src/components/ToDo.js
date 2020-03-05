import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import styled from "styled-components";

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

  //styles
  const Controls = styled.div`
${'' /* border: 1px dashed grey; */}
display:flex;
justify-content: space-between;
margin: 0 1% 0 1%;
`

  const Task = styled.div`
${'' /* border: 1px dashed grey; */}
`

const LogOut = styled.button `
border: 1px dotted gray;
width:15%;
background: red;
color:black;
font-size: 30px;
border-radius:5%;

`


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
      <footer>
        {localStorage.getItem("token") ? (
          <LogOut >
            Log Out
            </LogOut>
        ) : null}
      </footer>
    </>
  );
};

export default ToDo;
