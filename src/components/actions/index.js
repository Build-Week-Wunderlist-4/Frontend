export const changeTask = id => dispatch => {
  console.log("2. actions/index.js", id);

  dispatch({ type: "UPDATE_TASK_NAME", currentId: id });
};
