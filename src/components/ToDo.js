import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import styled from "styled-components";
import Header from "./Header"
import Background from "./colors1.jpg"

//styles
const Controls = styled.div`
${'' /* border: 1px dashed grey; */}
display:flex;
justify-content: space-between;
margin: 0 2% 0 2%;
`
const BackgroundImage = styled.div`
  background: url(${Background}) no-repeat center center fixed; 
  background-size: cover;    
  height:100vh;
  overflow-y:hidden;
`
const Task = styled.div`
${'' /* border: 1px dashed grey; */}
`
const TaskFont = styled.button`
font-family: 'Baloo Chettan', cursive;
font-size:100%;

background-color: Transparent;
    background-repeat:no-repeat;
    border: 1px solid black;
    border-radius: 15px;
    cursor:pointer;
    overflow: hidden; 
`
const AddText = styled.label`
font-family: 'Baloo Chettan', cursive;
Font-size: 1.5em;
`

const AddButton = styled.button`
font-family: 'Baloo Chettan', cursive;
font-size:1em;
background-color: Transparent;
    background-repeat:no-repeat;
    border: 1px solid black;
    border-radius: 15px;
    cursor:pointer;
    overflow: hidden; 
`


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
    <BackgroundImage>
      <Header />
      <Controls>
        <form onSubmit={handleSubmit}>
          <AddText htmlFor="name">New Task </AddText>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="Get this done"
            value={input.name}
            onChange={handleChanges}
          />
          <AddButton type="submit">Add</AddButton>
        </form>
        <TaskFont onClick={removeAll}>Delete Completed Tasks</TaskFont>
      </Controls>


      <Task>
        {tasks.map(i => (
          <div className={i.is_complete ? "completed" : null}>
            <h1>{i.name}</h1>
            <TaskFont onClick={() => markComplete(i.id, i.is_complete)}>Task Completed</TaskFont>
            <TaskFont onClick={() => remove(i.id)}>Delete Task</TaskFont>
          </div>
        ))}
      </Task>
    </BackgroundImage>
  );
};

export default ToDo;
