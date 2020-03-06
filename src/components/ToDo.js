import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import styled from "styled-components";
import Header from "./Header";
import Background from "./colors1.jpg";
import { changeTask } from './actions/index';
import { connect } from 'react-redux';

//styles
const Controls = styled.div`
  ${"" /* border: 1px dashed grey; */}
  display:flex;
  justify-content: space-between;
  margin: 0 2% 0 2%;
`;
const BackgroundImage = styled.div`
  background: url(${Background}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  overflow-y: hidden;
`;
const Task = styled.div`
  ${"" /* border: 1px dashed grey; */}
`;
const TaskFont = styled.button`
  font-family: "Baloo Chettan", cursive;
  font-size: 100%;

  background-color: Transparent;
  background-repeat: no-repeat;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
`;
const AddText = styled.label`
  font-family: "Baloo Chettan", cursive;
  font-size: 1.5em;
`;

const AddButton = styled.button`
  font-family: "Baloo Chettan", cursive;
  font-size: 1em;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
`;

const ToDo = (props) => {
  const [input, setInput] = useState({});
  const [tasks, setTasks] = useState([]);
  const [bool, setBool] = useState(true);
  const [update, setUpdate] = useState({});

  console.log("5. Todo.js - FINAL PROPS", props);

  useEffect(() => {
    AxiosWithAuth()
      .get("api/tasks")
      .then(response => {
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
        setInput({ name: "" });
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
        setBool(!bool);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  const editTask = id => {
    // setUpdate({ is_edit: !update.is_edit, item_id: id });
    console.log("1. ToDo.js, editTask - props", props);
    
    // GOTCHA: Running changeTask isn't the same as props.changeTask
    props.changeTask(id);
  };

  const submitEdit = () => {
    AxiosWithAuth()
      .put(`api/tasks/${props.item_id}`, {
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
          {/* <button onClick={setSchedule} className="scheduled">
            Daily
          </button> */}

          <AddButton type="submit">Add</AddButton>
          <TaskFont onClick={removeAll}>Delete Completed Tasks</TaskFont>
        </form>
      </Controls>

      <Task>
        {tasks.map(i => (
          <div
            key={i.id}
            className={`item-list ${i.is_complete ? "completed" : null}`}
          >
            <h3> {i.name} </h3>{" "}
            {/* <p>{i.repeat_condition === 1 ? "Daily" : ""}</p> */}
            {props.item_id === i.id && props.is_edit ? (
              <>
                <input
                  name="updatedTask"
                  onChange={handleUpdate}
                  value={update.updatedTask}
                />
                <TaskFont onClick={submitEdit}>Update</TaskFont>
              </>
            ) : (
              ""
            )}
            <TaskFont onClick={() => editTask(i.id)}>
              {props.item_id === i.id && props.is_edit ? "cancel" : "edit"}
            </TaskFont>
            <TaskFont onClick={() => markComplete(i.id, i.is_complete)}>
              complete
            </TaskFont>
            <TaskFont onClick={() => remove(i.id)}>X</TaskFont>
          </div>
        ))}
      </Task>
    </BackgroundImage>
  );
};

const mapPropsToState = state => {
  console.log("4. ToDo.js - state", state)
  return state;
};
export default connect(mapPropsToState, {changeTask})(ToDo);

// export default connect({ changeTask })(ToDo);

// const setSchedule = e => {
//   e.preventDefault();
//   setInput({
//     ...input,
//     repeat_condition: 1
//   });
// };

// let todayDate = new Date();
// let todayHour = todayDate.getHours();
// response.data.forEach(item => {
//  if (item.repeat_condition === 1 && todayHour === 14) {
// console.log("This is where I need to reset it to 0");
//   }
// });
