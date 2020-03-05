import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import styled from "styled-components";

//styles
const Controls = styled.div`
  ${"" /* border: 1px dashed grey; */}
  display:flex;
  justify-content: space-between;
  margin: 0 1% 0 1%;
`;

const Task = styled.div`
  ${"" /* border: 1px dashed grey; */}
`;

const ToDo = () => {
  const [input, setInput] = useState({});
  const [tasks, setTasks] = useState([]);
  const [bool, setBool] = useState(true);
  const [update, setUpdate] = useState({});

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
        setInput({ value: '' });
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
      <Controls>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">New Task</label>
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

          <button type="submit">Add</button>
          <button onClick={removeAll}>Delete Completed Tasks</button>
        </form>

        <Task>
          {tasks.map(i => (
            <div
            key={i.id}
            className={`item-list ${i.is_complete ? "completed" : null}`}
            >
              <h3> {i.name} </h3>{" "}
              {/* <p>{i.repeat_condition === 1 ? "Daily" : ""}</p> */}
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
        </Task>
      </Controls>
    </>
  );
};

export default ToDo;

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